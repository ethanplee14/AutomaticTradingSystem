import Debug from "debug";
import dateFormat from "dateformat";

import {IbkrClient} from "../swagger";

const debug = Debug("ibkr:heartbeat")

export class IbkrHeartbeat {

    private readonly client

    constructor(client: IbkrClient) {
        this.client = client
    }

    async run() {
        debug(`Sending heartbeat at <${dateFormat(Date.now(), "h:mm:ss")}>`)
        const tickleRes = await this.client.session.ticklePost()
        debug("Tickle response: " + JSON.stringify(tickleRes.body))
        const authenticated = tickleRes.body.iserver.authStatus.authenticated
        if (!authenticated)
            await this.reauthenticate()
    }

    private async reauthenticate() {
        debug("Attempting re-authentication")
        const status = await this.client.session.iserverReauthenticatePost()
        if (status.body.error) {
            debug("Re-authentication failed")
            throw new Error(status.body.error)
        }
        debug("Re-authentication status: " + JSON.stringify(status))
    }
}