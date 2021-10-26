import ironCondorSettings from '../../../config/iron-condor.json'
import {Strategy} from "../../bot/strategy";
import {MarketData} from "../../market/market-data";
import {Broker} from "../../brokers/broker";
import {OptionOrder} from "../../brokers/option-order";
import {Option, OptionChain} from "../../market/option";
import dateFormat from "dateformat";
import {calcStrikes} from "./calc-strikes";
import {nearestDate} from "../../utils/date";

require('datejs')

export class IronCondor implements Strategy {

    private readonly constraints: Array<(optsOrdered: Option[]) => boolean | Promise<boolean>> = []

    addConstraint(constraint: (optsOrdered: Option[]) => boolean | Promise<boolean>) {
        // TODO: Abstract away add constraints to order constraints
        this.constraints.push(constraint)
    }

    async run(broker: Broker, market: MarketData) {
        // TODO: Should really have strategy run constraints.
        if (!(await market.endOfWeek(new Date())) || !(await withinStrategyTradingHrs(market)))
            return

        for(const symbol of ironCondorSettings.stockList) {
            const [stockPrice, optionChain] = await lookupData(symbol, market)
            const icOrders = await this.icOptionOrders(symbol, stockPrice, optionChain)
            await broker.placeOptionOrders(...icOrders)
        }
    }

    private async icOptionOrders(symbol: string, stockPrice: number, optionChain: OptionChain) {
        const expires = Object.keys(optionChain).map(Date.parse)
        const expire = nearestDate(new Date().addWeeks(1), expires)
        const expireStr = dateFormat(expire, 'yyyy-mm-dd')
        const strikes = Object.keys(optionChain[expireStr]).map(parseFloat).sort()
        const icStrikes = calcStrikes(stockPrice, ironCondorSettings.moneyness, strikes)

        if (!icStrikes)
            return []

        const options = [
            optionChain[expireStr][icStrikes['pb']].put,
            optionChain[expireStr][icStrikes['ps']].put,
            optionChain[expireStr][icStrikes['cs']].call,
            optionChain[expireStr][icStrikes['cb']].call
        ]

        const shouldPlaceTrade = (await Promise.all(this.constraints.map(c => c(options)))).every(Boolean)
        if (!shouldPlaceTrade)
            return []

        const pb = new OptionOrder(symbol, icStrikes['pb'], expire, "buy", "put", "MKT")
        const ps = new OptionOrder(symbol, icStrikes['ps'], expire, "sell", "put", "MKT")
        const cs = new OptionOrder(symbol, icStrikes['cs'], expire, "sell", "call", "MKT")
        const cb = new OptionOrder(symbol, icStrikes['cb'], expire, "buy", "call", "MKT")
        return [pb, ps, cs, cb]
    }
}

async function withinStrategyTradingHrs(marketData: MarketData) {
    const today = new Date()
    const marketHours = await marketData.equitiesMarketHours("OPTION", dateFormat(today, 'yyyy-mm-dd'))
    const tradeHrsStart = (marketHours.start || new Date(0)).clone().addHours(1)
    const tradeHrsClose = (marketHours.end || new Date(0))
    return today >= tradeHrsStart && today < tradeHrsClose
}

async function lookupData(symbol: string, marketData: MarketData) {
    return Promise.all([
        (await marketData.stockQuote(symbol))[symbol]['price'],
        marketData.getOptionChain(symbol)
    ])
}
