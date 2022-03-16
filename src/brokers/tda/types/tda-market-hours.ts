
type MarketType = "BOND" | "EQUITY" | "ETF" | "FOREX" | "FUTURE" | "FUTURE_OPTION" | "INDEX" | "INDICATOR" |
    "MUTUAL_FUND" | "OPTION" | "UNKNOWN"

export interface TDAMarketHours {
    date: string,
    marketType: MarketType,
    exchange?: string
    category?: string,
    product: string,
    productName?: string
    isOpen: boolean,
    sessionHours?: {
        regularMarket: [
            {
                start: string,
                end: string
            }
        ]
    }
}
