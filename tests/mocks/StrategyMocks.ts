import {MarketData} from "../../src/market/market-data";
import {Broker} from "../../src/brokers/broker";


export class MockMarketData extends MarketData {
    stockQuote = jest.fn()
    getOptionChain = jest.fn()
    equitiesMarketHours = jest.fn()
}

export class MockBroker implements Broker {
    placeOptionOrders = jest.fn()
    cashBal = jest.fn()
    buyingPower = jest.fn()
}