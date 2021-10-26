type Strategy = "SINGLE" | "ANALYTICAL" | "COVERED" | "VERTICAL" | "CALENDAR" | "STRANGLE" | "STRADDLE" | "BUTTERFLY" | "CONDOR" | "DIAGONAL" | "COLLAR" | "ROLL"
type OptionRange = "ALL" | "ITM" | "NTM" | "OTM" | "SAK" | "SBK" | "SNK"
type ExpMonth = "ALL" | "JAN" | "FEB" | "MAR" | "APR" | "MAY" | "JUN" | "JUL" | "AUG" | "SEP" | "OCT" | "NOV" | "DEC"
type ExpireDateStr = string
type StrikeStr = string
type ExpDateMap = Record<ExpireDateStr, Record<StrikeStr, Option[]>>


/**
 * Parameter for option chain endpoint. Date format can be: 'yyyy-MM-dd' or 'yyyy-MM-dd'T'HH:mm:ssz'.
 * Expiration Month is first three letter of month. Default is ALL
 */
export type Params = {
    contractType?: string, // "ALL" | "CALL" | "PUT"
    strikeCount?: number,
    includeQuotes?: boolean, //default is false
    strategy?: string,
    interval?: number,
    strike?: number,
    range?: OptionRange,
    fromDate?: string ,
    toDate?: string,
    volatility?: number,
    underlyingPrice?: number,
    interestRate?: number,
    daysToExpiration?: number,
    expMonth?: ExpMonth
}

export type OptionChain = {
    symbol: string,
    status: string,
    underlying: Underlying | null,
    strategy: string,
    interval: number,
    isDelayed: boolean,
    isIndex: boolean,
    numberOfContracts: number,
    daysToExpiration: number,
    interestRate: number,
    underlyingPrice: number,
    volatility: number,
    callExpDateMap: ExpDateMap,
    putExpDateMap: ExpDateMap
}

export type Option = {
    putCall: string, // "PUT" | "CALL"
    symbol: string,
    description: string,
    exchangeName: string,
    bid: number,
    ask: number,
    last: number,
    mark: number,
    bidSize: number,
    askSize: number,
    bidAskSize: string,
    lastSize: number,
    highPrice: number,
    lowPrice: number,
    openPrice: number,
    closePrice: number,
    totalVolume: number,
    quoteTimeInLong: number,
    tradeTimeInLong: number,
    netChange: number,
    volatility: number,
    delta: number,
    gamma: number,
    theta: number,
    vega: number,
    rho: number,
    timeValue: number,
    openInterest: number,
    inTheMoney: boolean,
    theoreticalOptionValue: number,
    theoreticalVolatility: number,
    mini: boolean,
    nonStandard: boolean,
    optionDeliverablesList: [{
        symbol: string,
        assetType: string,
        deliverableUnits: string,
        currencyType: string
    }] | null,
    strikePrice: number,
    expirationDate: number,
    expirationType: string,
    multiplier: number,
    settlementType: string,
    deliverableNote: string,
    isIndexOption: boolean | null,
    percentChange: number,
    markChange: number,
    markPercentChange: number
}

export type Underlying = {
    ask: number,
    askSize: number,
    bid: number,
    bidSize: number,
    change: number,
    close: number,
    delayed: boolean,
    description: string,
    exchangeName: string,
    fiftyTwoWeekHigh: number,
    fiftyTwoWeekLow: number,
    highPrice: number,
    last: number,
    lowPrice: number,
    mark: number,
    markChange: number,
    markPercentChange: number,
    openPrice: number,
    percentChange: number,
    quoteTime: number,
    symbol: string,
    totalVolume: number,
    tradeTime: number
}
