import {MarketData} from "../market/market-data";
import {Broker} from "../brokers/Broker";

export interface Strategy {
    setup?: () => Promise<void>
    run: (broker: Broker, marketData: MarketData) => Promise<void>
}
