import Alpaca from "@alpacahq/alpaca-trade-api";
import {Broker, Portfolio, Position} from "../broker";
import {Order} from "../order";
import {OptionOrder} from "../option-order";


export class AlpacaBroker implements Broker {

    private alpaca: Alpaca

    constructor(alpaca: Alpaca) {
        this.alpaca = alpaca
    }

    buyingPower(): Promise<number> {
        return Promise.resolve(0);
    }

    cashBal(): Promise<number> {
        // TODO: Not yet implemented
        return Promise.resolve(0);
    }

    placeEquitiesOrders(...orders: Order[]): Promise<{ orderId: string; status: string }[]> {
        // TODO: Not yet implemented
        return Promise.resolve([]);
    }

    placeOptionOrders(...orders: OptionOrder[]): Promise<any> {
        // TODO: Not yet implemented
        return Promise.resolve(undefined);
    }

    portfolio(): Promise<Portfolio> {
        // TODO: Not yet implemented
        return Promise.resolve({cash: 0, stocks: 0});
    }

    positions(): Promise<Position[]> {
        return Promise.resolve([]);
    }
}