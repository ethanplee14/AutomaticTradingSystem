import {TDAFetcher} from "./net/tda-fetcher";
import {OAuth2} from "./auth/oauth2";
import {OptionChain, Params} from "./types/option-chains";
import {TokenCache} from "./auth/token-cache";
import {optionChain} from "./api/option-chain";
import {accounts} from "./api/accounts";
import {quotes} from "./api/quotes";
import {Market, marketHours} from "./api/market-hours";
import {TDAMarketHours} from "./types/tda-market-hours";


const AUTH_URL = 'https://api.tdameritrade.com/v1/oauth2/token'


export function tdaClient(tokenCache: TokenCache) {
    const auth = new OAuth2(AUTH_URL, tokenCache)
    const fetcher = new TDAFetcher(auth)

    return {
        quotes: quotes(fetcher),
        optionChain: optionChain(fetcher),
        accounts: accounts(fetcher),
        hours: marketHours(fetcher)
    }
}

export interface TDAClient {
    quotes: {
        getQuote: (symbol: string) => Promise<any>,
        getQuotes: (...symbol: string[]) => Promise<any>
    },
    optionChain: {
        getOptionChain: (symbol: string, params?: Params) => Promise<OptionChain>
    },
    accounts: {
        getAccount: (accountId: string, positions?: boolean, orders?: boolean) => Promise<any>,
        getAccounts: (positions?: boolean, orders?: boolean) => Promise<any>
    },
    hours: {
        singleMarket: (type: Market, date: string) => Promise<Record<string, TDAMarketHours>>
    }
}

