import {OptionChain} from "./option";
import {StockQuote} from "./stock";
import {MarketHours} from "./market-hours";
import {Market} from "../brokers/tda/api/market-hours";
import dateFormat from "dateformat";

export abstract class MarketData {

    abstract stockQuote(...symbol: string[]): Promise<Record<string, StockQuote>>
    abstract getOptionChain(symbol: string): Promise<OptionChain>

    /**
     * Fetches equities market start and end hours and whether the market is open.
     * @param market
     * @param date - date string formatted as 'yyyy-mm-dd'
     */
    abstract equitiesMarketHours(market: Market, date: string): Promise<MarketHours>

    async currentlyOpen(market: Market) {
        const today = new Date()
        const marketHours = await this.equitiesMarketHours(market, dateFormat(today, 'yyyy-mm-dd'))
        return today >= (marketHours.start || new Date(0)) && today < (marketHours.end || new Date(0))
    }

    async endOfWeek(date: Date) {
        if (date.getDay() == 4) {
            const tomorrowDateStr = dateFormat(date.clone().addDays(1), 'yyyy-mm-dd')
            const tomorrowOpen = (await this.equitiesMarketHours("OPTION", tomorrowDateStr)).dayOpen
            if (!tomorrowOpen)
                return true
        }

        const todayDateStr = dateFormat(date, 'yyyy-mm-dd')
        const marketIsOpen = (await this.equitiesMarketHours("OPTION", todayDateStr)).dayOpen
        return date.getDay() == 5 && marketIsOpen
    }
}

