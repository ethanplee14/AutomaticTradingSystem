import Debug from 'debug'

import {Strategy} from "./strategy";
import {MarketData} from "../market/market-data";
import {Broker} from "../brokers/Broker";


const debug = Debug("strategy-engine")

export class StrategyEngine implements Engine {

    private strategies: Strategy[] = []
    private _loopInterval = 1000
    private loopId?: NodeJS.Timeout
    private readonly client
    private readonly marketData

    constructor(client: Broker, marketData: MarketData) {
        this.client = client
        this.marketData = marketData
    }

    set loopInterval(interval: number) {
        this._loopInterval = interval
    }

    register(...strategies: Strategy[]) {
        this.strategies.push(...strategies)
    }

    async start() {
        debug("Bot engine starting...")
        await this.setupStrategies()
        this.runStrategies()
    }

    stop() {
        debug("Strategy engine stopping...")
        if (this.loopId)
            clearInterval(this.loopId)
    }

    protected async setupStrategies() {
        const setupPromises = this.strategies
            .filter(s => s.setup != undefined)
            .map(s => s.setup!!())
        await Promise.all(setupPromises)
    }

    protected runStrategies() {
        this.loopId = setInterval(() => {
            for (const strategy of this.strategies)
                strategy.run(this.client, this.marketData).then()
        }, this._loopInterval)
    }
}