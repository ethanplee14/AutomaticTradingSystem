import {OptionChain} from "./option";
import {StockQuote} from "./stock";
import {MarketHours} from "./market-hours";
import {Market} from "../brokers/tda/api/market-hours";

export abstract class MarketData {

    abstract stockQuote(...symbol: string[]): Promise<Record<string, StockQuote>>
    abstract getOptionChain(symbol: string): Promise<OptionChain>

    /**
     * Fetches equities market start and end hours and whether the market is open.
     * @param market
     * @param date - lookupDate
     */
    abstract marketHrs(market: Market, date: Date): Promise<MarketHours>

    async currentlyOpen(market: Market) {
        const today = new Date()
        const marketHours = await this.marketHrs(market, today)
        return today >= (marketHours.start || new Date(0)) && today < (marketHours.end || new Date(0))
    }

    async endOfWeek(date: Date) {
        if (date.getDay() == 4) {
            const tomorrowDateStr = date.clone().addDays(1)
            const tomorrowOpen = (await this.marketHrs("OPTION", tomorrowDateStr)).isOpen
            if (!tomorrowOpen)
                return true
        }

        const marketIsOpen = (await this.marketHrs("OPTION", date)).isOpen
        return date.getDay() == 5 && marketIsOpen
    }
}

