import {Order, OrderSide, OrderTimeInForce, OrderType} from "./order";
import Decimal from "decimal.js";

export class OptionOrder implements Order {

    public symbol: string
    public strike: number
    public expire: Date
    public side: OrderSide
    public right: "call" | "put"
    public type: "MKT" | "LMT" | "STP" | "STP_LIMIT"
    public price?: Decimal
    public timeInForce: OrderTimeInForce
    public quantity: number


    /**
     TODO:
         Allow legs to be added to OptionOrder.
         Refactor the logic of building orders outside of Ibkr class by
         extension or class composition to attach ibkr order protocol to OptionOrder
     */
    constructor(
        symbol: string, strike: number, expire: Date,
        side: OrderSide, right: "call" | "put",
        type: OrderType,
        price?: Decimal,
        quantity: number = 1,
        timeInForce: OrderTimeInForce = "GTC",
    ) {
        this.symbol = symbol
        this.strike = strike
        this.expire = expire
        this.side = side
        this.right = right
        this.type = type
        this.price = price
        this.timeInForce = timeInForce
        this.quantity = quantity
    }
}
