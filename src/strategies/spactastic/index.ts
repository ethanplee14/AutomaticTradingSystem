import {Strategy} from "../../bot/strategy";
import {Broker, Position} from "../../brokers/broker";
import {MarketData} from "../../market/market-data";
import {StockQuote} from "../../market/stock";
import {calcKellyRanking} from "./kelly-inputs";
import Decimal from "decimal.js";
import {rankBasedAllocation} from "../../calc/alloc";


type Ranking = {
    symbol: string,
    quantity: number,
    mktPrice: number,
    ranking: Decimal
}

export class Spactastic implements Strategy {

    private readonly spacLookup

    constructor(spacLookup: () => Promise<string[]>) {
        this.spacLookup = spacLookup
    }

    async run(broker: Broker, marketData: MarketData) {
        const todayMarketHrs = await marketData.marketHrs("EQUITY", new Date())
        if(!todayMarketHrs.isOpen)
            return

        const hrBeforeMarketClose = todayMarketHrs.end?.addHours(-1)
        // if (hrBeforeMarketClose && new Date() >= hrBeforeMarketClose) {
            console.log("Running daily Spacstastic Strategy")
            const [universe, portfolio] = await Promise.all([this.spacLookup(), broker.portfolio()])
            console.log("Checking SPACS: " + JSON.stringify(universe))
            console.log("Portfolio Val: " + JSON.stringify(portfolio))

            const quotes = await marketData.stockQuote(...universe.slice(10, 20))
            console.log("Found Quotes: " + JSON.stringify(Object.values(quotes)))
            const positions = await broker.positions()
            console.log("Current positions: " + JSON.stringify(positions))

            const portfolioVal: number = Object.values(portfolio).reduce((acc, curr) => acc + curr, 0)
            const positionToSell = this.sellPositions(positions, broker)
            const rankings = this.calcRankings(positionToSell, Object.values(quotes))
            console.log("Rankings: " + rankings)
            const allocs = this.reallocShares(rankings, portfolioVal)

            console.log("Re-balancing Portfolio: " + JSON.stringify(allocs))
            await this.balancePortfolio(broker, allocs)
        // }
    }

    private sellPositions(positions: Position[], broker: Broker) {
        positions
            .filter(p => p.marketPrice >= 10)
            .forEach(p => broker.placeEquitiesOrders({
                symbol: p.ticker, side: "SELL",
                quantity: p.quantity,
                timeInForce: "DAY",
                type: "MKT"
            }))
        return positions.filter(p => p.marketPrice < 10)
    }

    private calcRankings(positions: Position[], quotes: StockQuote[]): Ranking[] {
        const buyAndSellPositions = positions
            .map(p => ({symbol: p.ticker, mktPrice: p.marketPrice, quantity: p.quantity}))
            .concat(quotes.map(q => ({symbol: q.symbol, mktPrice: q.price, quantity: 0})))
        console.log(buyAndSellPositions)
        return positions
            .map(p => ({symbol: p.ticker, mktPrice: p.marketPrice, quantity: p.quantity}))
            .concat(quotes.map(q => ({symbol: q.symbol, mktPrice: q.price, quantity: 0})))
            .filter(p => p.mktPrice <= 9.7 && p.mktPrice >= 9.4)
            .map(q => ({...q, ranking: calcKellyRanking(new Decimal(q.mktPrice))}))
    }

    private reallocShares(rankings: Ranking[], portfolioVal: number): {symbol: string, quantity: number}[] {
        const totalKelly = rankings.reduce((acc, curr) => acc.add(curr.ranking), new Decimal(0))
        return rankings.map(ranking => ({
            symbol: ranking.symbol,
            quantity: rankBasedAllocation(
                totalKelly, ranking.ranking, portfolioVal,
                ranking.quantity, ranking.mktPrice
            )
        }))
    }

    private async balancePortfolio(broker: Broker, allocs: {symbol: string, quantity: number}[]) {
        await Promise.all(allocs
            .filter(a => a.quantity < 0)
            .map(placeOrder))
        await Promise.all(allocs
            .filter(a => a.quantity > 1)
            .map(placeOrder))

        function placeOrder(alloc: {symbol: string, quantity: number}) {
            return broker.placeEquitiesOrders({
                symbol: alloc.symbol, timeInForce: "DAY",
                quantity: Math.abs(alloc.quantity),
                type: "MKT",
                side: alloc.quantity > 0 ? "BUY" : "SELL",
            })
        }
    }
}
