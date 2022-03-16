import {MarketData} from "../market-data";
import {StockQuote} from "../stock";
import {OptionChain} from "../option";
import {Market} from "../../brokers/tda/api/market-hours";
import {Ibkr} from "../../brokers/ibkr/ibkr";
import {InlineResponse20029} from "../../brokers/ibkr/swagger";


export class IbkrMarketData extends MarketData {

    private readonly marketOpen = "09:00:00"
    private readonly marketClose = "16:30:00"
    private ibkr

    constructor(ibkr: Ibkr) {
        super()
        this.ibkr = ibkr
    }

    async marketHrs(market: Market, date: Date) {
        if(market != "EQUITY" && market != "OPTION")
            throw new Error("Ibkr market hrs only supports market hrs for: EQUITY, OPTION")
        const nyDateTime = new Date(date.toLocaleString('en-US', {timeZone: "America/New_York"}))

        //check weekend
        if(nyDateTime.getDay() == 6 || nyDateTime.getDay() == 0)
            return {isOpen: false}

        const nyTime = date.toLocaleTimeString('en-US', {timeZone: "America/New_York", hour12: false})
        const isMarketOpen = nyTime >= this.marketOpen && nyTime < this.marketClose

        const startDate = new Date(nyDateTime)
        startDate.setHours(7, 0, 0, 0)

        const endDate = new Date(nyDateTime)
        endDate.setHours(14, 30, 0, 0)
        return {
            start: startDate,
            end: endDate,
            isOpen: isMarketOpen
        }
    }

    getOptionChain(symbol: string): Promise<OptionChain> {
        //TODO
        return Promise.resolve(undefined as any);
    }

    async stockQuote(...symbols: string[]) {
        console.log("Looking up stock quotes")
        const symbolsLookup = await Promise.allSettled(symbols.map(s => this.ibkr.lookupSymbol(s)))
        console.log("Succeeded in looking up stock quotes")
        const conids = symbolsLookup
            .filter(lookup => {
                if(lookup.status == "rejected")
                    console.log(lookup.reason)
                return lookup.status == "fulfilled"
            }).map(lookup => {
                lookup = lookup as PromiseFulfilledResult<InlineResponse20029>
                return lookup.value.conid
            })
        console.log(conids.join(","))
        await this.ibkr.client.account.iserverAccountsGet()
        const snapshots = await this.ibkr.client.market.iserverMarketdataSnapshotGet(conids.join(","), undefined, "31,55")
        const quotes: Record<string, StockQuote> = {}
        snapshots.body
            .forEach(snapshot => {
                if (!snapshot._55 || !snapshot._31)
                    throw new Error(`Could not load IBKR market quote {snapshot: ${JSON.stringify(snapshot)}, symbol: ${snapshot._55}, price: ${snapshot._31}}`)
                quotes[snapshot._55!] = {
                    symbol: snapshot._55!,
                    price: parseFloat(snapshot._31!)
                }
            })
        return quotes;
    }
}
