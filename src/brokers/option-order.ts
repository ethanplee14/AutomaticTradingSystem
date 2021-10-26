
export class OptionOrder {

    public symbol: string
    public strike: number
    public expire: Date
    public side: "buy" | "sell"
    public right: "call" | "put"
    public type: "MKT" | "LMT" | "STP" | "STP_LIMIT"
    public price?: number
    public tif: string
    public quantity: number


    /**
     TODO:
         Allow legs to be added to OptionOrder.
         Refactor the logic of building orders outside of Ibkr class by
         extension or class composition to attach ibkr order protocol to OptionOrder
     */
    constructor(
        symbol: string, strike: number, expire: Date,
        side: "buy" | "sell", right: "call" | "put",
        type: "MKT" | "LMT" | "STP" | "STP_LIMIT",
        price?: number,
        quantity: number = 1,
        tif: string = "day"
    ) {
        this.symbol = symbol
        this.strike = strike
        this.expire = expire
        this.side = side
        this.right = right
        this.type = type
        this.price = price
        this.tif = tif
        this.quantity = quantity
    }

    equals(order: OptionOrder) {
        return this.symbol == order.symbol &&
            this.strike == order.strike &&
            this.expire == order.expire &&
            this.side == order.side &&
            this.right == order.right &&
            this.type == order.type &&
            this.price == order.price &&
            this.tif == order.tif &&
            this.quantity == order.quantity
    }
}
