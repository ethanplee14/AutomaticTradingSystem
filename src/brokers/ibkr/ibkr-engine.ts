import {IbkrHeartbeat} from "./auth/ibkr-heartbeat";
import {IbkrClient} from "./swagger";

export class IbkrEngine {

    private readonly heartbeat
    private readonly interval

    constructor(client: IbkrClient, interval: number=60000) {
        this.heartbeat = new IbkrHeartbeat(client)
        this.interval = interval
    }

    start() {
        setInterval(() => {
            this.heartbeat.run()
        }, this.interval)
    }
}