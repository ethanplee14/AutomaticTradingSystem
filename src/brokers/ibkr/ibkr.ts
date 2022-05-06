import dateFormat from 'dateformat'

import {Broker, Position} from "../Broker";
import {ibkrClient, OrderRequest, SecdefInfo} from "./swagger";
import {OptionOrder} from "../option-order";
import {shortMonthName, twoDigitYear} from "../../utils/date";
import {IbkrEngine} from "./ibkr-engine";
import {Order} from "../order";

export class Ibkr implements Broker {

    private useAdaptiveAlgo = true
    readonly client
    private readonly accountId
    private readonly engine

    constructor(accountId: string, client=ibkrClient()) {
        this.client = client
        this.accountId = accountId
        this.engine = new IbkrEngine(client)
        this.engine.start()
    }

    set setAdaptiveAlgo(useAdaptiveAlgo: boolean) {
        this.useAdaptiveAlgo = useAdaptiveAlgo
    }

    async placeEquitiesOrders(...orders: Order[]) {
        const order = orders[0]
        if (!order || order.quantity == 0)
            return []

        const symbolLookup = await this.lookupSymbol(order.symbol)
        const conid = symbolLookup.conid ?? 0

        const ordersData = [{
            conid, "side": order.side,
            "orderType": order.type,
            "quantity": order.quantity,
            "tif": order.timeInForce
        }]

        /*
        looks like the api is wrong and the response isn't InlineResponse20021
        manually edited InlineResponse20021. Should edit the swagger.json but will
        fiddle with swagger's configurations at a later time

        should really throw errors with parameters to know what to debug for rather than return empty object
         */
        const response = await this.client.order.iserverAccountAccountIdOrdersPost(this.accountId, {orders: ordersData})
        return response.body.map(orderRes => ({
            orderId: orderRes.order_id ?? "",
            status: orderRes.order_status ?? ""
        })) ?? []
    }


    async placeOptionOrders(...orders: OptionOrder[]) {
        if (orders.length == 0)
            return

        const symbolInfos = await Promise.all(orders.map(o => this.lookupSymbol(o.symbol)))
        const optionInfos = await Promise.all(symbolInfos.map((info, index) => this.lookupOpt(info.conid!!.toString(), orders[index])))

        await this.client.order.iserverAccountAccountIdOrdersPost(this.accountId, {
            orders: this.buildIBKROrders(orders, optionInfos)
        })
    }

    async cashBal() {
        const accountSummary = await this.client.account.portfolioAccountIdSummaryGet(this.accountId)
        const cashBal = accountSummary.body?.availablefunds?.amount
        if (cashBal == undefined)
            throw new Error(`Got unexpected IBKR <cashBal> response:\n\t${accountSummary}`)
        return cashBal
    }

    async buyingPower() {
        const accountSummary = await this.client.account.portfolioAccountIdSummaryGet(this.accountId)
        const buyingPower = accountSummary.body?.buyingpower?.amount
        if (buyingPower == undefined)
            throw new Error(`Got unexpected IBKR <buyingPower> response:\n\t${accountSummary}`)
        return buyingPower
    }

    async positions() {
        const positions: Position[] = []

        let pageIndex = 0
        let positionsRes = await this.client.portfolio.portfolioAccountIdPositionsPageIdGet(this.accountId, pageIndex.toString())
        console.log("Positions: " + JSON.stringify(positionsRes.body))
        while(positionsRes.body.length > 0) {
            positionsRes.body.forEach((pos: any) => {
                const position: Position = {
                    avgCost: pos.avgCost, avgPrice: pos.avgPrice,
                    marketPrice: pos.mktPrice, marketValue: pos.mktValue,
                    quantity: pos.position, ticker: pos.ticker
                }
                positions.push(position)
            })
            positionsRes = await this.client.portfolio.portfolioAccountIdPositionsPageIdGet(this.accountId, (++pageIndex).toString())
        }
        return positions
    }

    async portfolio() {
        const portfolio = await this.client.portfolio.portfolioAccountIdAllocationGet(this.accountId) as any
        return {
            cash: portfolio.body[0].long?.CASH ?? 0,
            stocks: portfolio.body[0].long?.STK ?? 0
        }
    }

    async lookupSymbol(symbol: string) {
        const stockRequest = await this.client.contract.iserverSecdefSearchPost({symbol})
        console.log(stockRequest.body)
        const symbolInfo = stockRequest.body[0]
        const exchange = symbolInfo['description']
        if(exchange != "NYSE" && exchange != "NASDAQ")
            throw new Error(`Requested symbol <${symbol}> not found in NYSE or NASDAQ: ${exchange}`)
        console.log("Completed lookup: " + symbol)
        return symbolInfo
    }

    private async lookupOpt(contractConid: string, order: OptionOrder) {
        const expireMonthStr = `${shortMonthName(order.expire).toUpperCase()}${twoDigitYear(order.expire)}`
        const orderRight = order.right == "put" ? "P" : "C"
        const optionInfo = await this.client.contract.iserverSecdefInfoGet(
            contractConid, "OPT", expireMonthStr, "SMART", order.strike.toString(), orderRight
        )
        //api should be editted to reflect this rather than me casting it manually
        return optionInfo.body as SecdefInfo[]
    }

    //This needs to be IBKROptionsOrders. Refactor out
    private buildIBKROrders(orders: OptionOrder[], optionInfoResults: SecdefInfo[][]) {
        const ibkrOrders = orders.map((order, index) => {
            const optInfos = optionInfoResults[index]
            const optInfo = optInfos.find(info => info.maturityDate == dateFormat(order.expire, "yyyymmdd"))
            if (!optInfo)
                throw new Error("Option expiration not found: " + dateFormat(order.expire, 'yyyymmdd'))
            return {
                accId: this.accountId,
                conid: optInfo.conid,
                secType: `${optInfo.conid}:OPT`,
                price: order.price,
                orderType: order.type, ticker: order.symbol, tif: order.timeInForce.toUpperCase(),
                side: order.side.toUpperCase(), quantity: order.quantity,
                useAdaptive: this.useAdaptiveAlgo
            } as OrderRequest
        })

        const orderId = `ic.${orders[0].symbol.toLowerCase()}-${Date.now()}`
        for(let i = 0; i < ibkrOrders.length; i++)
            ibkrOrders[i][i == 0 ? 'cOID' : 'parentId'] = orderId
        return ibkrOrders
    }

}
