import dateFormat from 'dateformat'

import {Broker} from "../Broker";
import {ibkrClient, OrderRequest, SecdefInfo} from "./swagger";
import {OptionOrder} from "../option-order";
import {shortMonthName, twoDigitYear} from "../../utils/date";
import {IbkrEngine} from "./ibkr-engine";

export class Ibkr implements Broker {

    private useAdaptiveAlgo = true
    private client
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
        return accountSummary.body?.availablefunds?.amount || 0
    }

    async buyingPower() {
        const accountSummary = await this.client.account.portfolioAccountIdSummaryGet(this.accountId)
        return accountSummary.body?.buyingpower?.amount || 0
    }

    private async lookupSymbol(symbol: string) {
        const stockRequest = await this.client.contract.iserverSecdefSearchPost({symbol})
        const symbolInfo = stockRequest.body[0]
        const exchange = symbolInfo['description']
        if(exchange != "NYSE" && exchange != "NASDAQ")
            throw new Error(`Requested symbol not found in NYSE or NASDAQ: ${exchange}`)
        return symbolInfo
    }

    private async lookupOpt(contractConid: string, order: OptionOrder) {
        const expireMonthStr = `${shortMonthName(order.expire).toUpperCase()}${twoDigitYear(order.expire)}`
        const orderRight = order.right == "put" ? "P" : "C"
        const optionInfo = await this.client.contract.iserverSecdefInfoGet(
            contractConid, "OPT", expireMonthStr, "SMART", order.strike.toString(), orderRight
        )
        return optionInfo.body as SecdefInfo[]
    }

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
                orderType: order.type, ticker: order.symbol, tif: order.tif.toUpperCase(),
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