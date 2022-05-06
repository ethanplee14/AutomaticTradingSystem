import {MarketData} from "../../market/market-data";
import {Market} from "../tda/api/market-hours";
import {OptionChain} from "../../market/option";
import {MarketHours} from "../../market/market-hours";
import {StockQuote} from "../../market/stock";

export class AlpacaMarket extends MarketData {

    async currentlyOpen(market: Market): Promise<boolean> {
        return Promise.resolve(false);
    }

    getOptionChain(symbol: string): Promise<OptionChain> {
        return Promise.resolve({});
    }

    marketHrs(market: Market, date: Date): Promise<MarketHours> {
        return Promise.resolve({isOpen: false});
    }

    stockQuote(...symbol: string[]): Promise<Record<string, StockQuote>> {
        return Promise.resolve({});
    }
}