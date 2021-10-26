import {v4 as uuid} from "uuid";

import {OrderRequest} from "../swagger";

export class Orderer {

    private orders: OrderRequest[] = []

    marketBuy(conid: number, quantity: number) {
        this.addOrder({conid, orderType: "MKT", side: "BUY", quantity})
    }

    marketSell(conid: number, quantity: number) {
        this.addOrder({conid, orderType: "MKT", side: "SELL", quantity})
    }

    limitBuy(conid: number, quantity: number, price: number) {
        this.addOrder({conid, orderType: "LMT", side: "BUY", price, quantity})
    }

    limitSell(conid: number, quantity: number, price: number) {
        this.addOrder({conid, orderType: "LMT", price, side: "SELL", quantity})
    }

    private addOrder(order: OrderRequest) {
        if(this.orders.length === 0) {
            order["cOID"] = uuid()
            this.orders.push(order)
        }else {
            order["parentId"] = this.orders[0].cOID
            this.orders.push(order)
        }
    }

    preview() {
        const ordersCopy: OrderRequest[] = []
        this.orders.forEach(o => ordersCopy.push(Object.assign({}, o)))
        return ordersCopy
    }
}
