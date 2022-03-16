import {OptionOrder} from "./option-order";
import {Order} from "./order";


export interface Position {
    quantity: number,
    marketValue: number, //total market value of all positions
    marketPrice: number,
    avgCost: number, //avg cost spent per stock
    avgPrice: number, //avg price spant per stock
    ticker: string

}

export interface Portfolio {
    cash: number,
    stocks: number
}

export interface Broker {
    placeEquitiesOrders(...orders: Order[]): Promise<{orderId: string, status: string}[]>
    placeOptionOrders(...orders: OptionOrder[]): Promise<any>
    cashBal(): Promise<number>
    buyingPower(): Promise<number>
    positions(): Promise<Position[]>
    portfolio(): Promise<Portfolio>
}
