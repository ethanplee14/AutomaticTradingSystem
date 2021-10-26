import {TDAFetcher} from "../net/tda-fetcher";

export function quotes(fetcher: TDAFetcher) {
    return {
        getQuote: function(symbol: string) {
            return fetcher.get(`marketdata/${symbol}/quotes`)
        },

        getQuotes: function(...symbols: string[]) {
            return fetcher.get(`marketdata/quotes`, {symbol: symbols.join(',')})
        }
    }
}