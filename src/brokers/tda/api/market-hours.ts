import {TDAFetcher} from "../net/tda-fetcher";

export type Market = "EQUITY" | "OPTION" | "FUTURE" | "BOND" | "FOREX"

export function marketHours(tdaFetcher: TDAFetcher) {

    return {
        /**
         * Fetches the market hours of single market type
         * @param type
         * @param date - Date formatted as yyyy-mm-dd
         */
        singleMarket: async function(type: Market, date: string) {
            const tdaHours = await tdaFetcher.get(`marketdata/${type}/hours`, {date})
            return tdaHours[type.toLowerCase()]
        }
    }
}
