import {TDAFetcher} from "../net/tda-fetcher";
import {OptionChain, Params} from "../types/option-chains";

export function optionChain(tdaFetcher: TDAFetcher) {

    const endpoint = "marketdata/chains"

    return {
        getOptionChain: function(symbol: string, params?: Params) {
            return tdaFetcher.get(endpoint, {...params, symbol}) as Promise<OptionChain>
        }
    }
}
