import {OptionOrder} from "./option-order";

export interface Broker {
    placeOptionOrders(...order: OptionOrder[]): Promise<any>
    cashBal(): Promise<number>
    buyingPower(): Promise<number>
}