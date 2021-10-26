export type ExpireStr = string
export type Strike = number
export type OptType = "call" | "put"
export type OptionChain = Record<ExpireStr, Record<Strike, Record<OptType, Option>>>

export interface Option {
    strike: number,
    bid: number,
    ask: number,
    bidSize: number,
    askSize: number,
    volume: number,
    volatility: number,
    delta: number,
    gamma: number,
    theta: number,
    vega: number,
    rho: number
}