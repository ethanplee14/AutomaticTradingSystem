import {TDAClient} from "../../brokers/tda";
import {MarketData} from "../market-data";
import {normalizeTDAOptionChain} from "./options-mapper";
import {StockQuote} from "../stock";
import {Market} from "../../brokers/tda/api/market-hours";
import dateFormat from "dateformat";

export class TDAMarketData extends MarketData {

    private client

    constructor(client: TDAClient) {
        super()
        this.client = client
    }

    async stockQuote(...symbols: string[]) {
        const quotes: Record<string, StockQuote> = {}
        const tdaQuote = await this.client.quotes.getQuotes(...symbols)
        Object.keys(tdaQuote).forEach(ticker => {
            quotes[ticker] = {
                price: tdaQuote[ticker].lastPrice,
                symbol: ticker
            }
        })
        return quotes
    }

    async getOptionChain(symbol: string) {
        const tdaOptionChain = await this.client.optionChain.getOptionChain(symbol)
        return normalizeTDAOptionChain(tdaOptionChain)
    }

    /**
     *
     * @param market
     * @param date
     */
    async marketHrs(market: Market, date: Date) {
        const marketHours = await this.client.hours.singleMarket(market, dateFormat(date, 'yyyy-mm-dd'))
        const equitiesMarketHrs = Object.values(marketHours)[0]
        if (!equitiesMarketHrs.isOpen || !equitiesMarketHrs.sessionHours)
            return { isOpen: false }

        return {
            start: new Date(equitiesMarketHrs.sessionHours.regularMarket[0].start),
            end: new Date(equitiesMarketHrs.sessionHours.regularMarket[0].end),
            isOpen: equitiesMarketHrs.isOpen
        }
    }
}

