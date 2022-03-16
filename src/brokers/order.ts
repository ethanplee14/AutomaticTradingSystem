import Decimal from "decimal.js";

export type OrderType = "MKT" | "LMT" | "STP" | "STP_LIMIT"
export type OrderSide = "BUY" | "SELL"
export type OrderTimeInForce = "DAY" | "GTC"

export interface Order {
    symbol: string,
    side: OrderSide,
    type: OrderType,
    quantity: number
    timeInForce: OrderTimeInForce
    price?: Decimal
}


