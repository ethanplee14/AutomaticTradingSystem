import {IbkrClient, SecdefInfo} from "../../brokers/ibkr/swagger";
import {IronCondorStrikes} from "./calc-strikes";
import {Orderer} from "../../brokers/ibkr/order/orderer";

export async function buildOrders(client: IbkrClient, stockConId: number, month: string, strikes: IronCondorStrikes) {
    const orderer = new Orderer()

    const psInfo = await lookupOptInfo(strikes['ps'], 'P')
    const pbInfo = await lookupOptInfo(strikes['pb'], 'P')
    const csInfo = await lookupOptInfo(strikes['cs'], 'C')
    const cbInfo = await lookupOptInfo(strikes['cb'], 'C')

    orderer.marketSell(psInfo.conid || -1, 1)
    orderer.marketBuy(pbInfo.conid || -1, 1)
    orderer.marketSell(csInfo.conid || -1, 1)
    orderer.marketBuy(cbInfo.conid || -1, 1)

    return orderer.preview()

    async function lookupOptInfo(strike: number, right: string) {
        const infoRes = await client.contract.iserverSecdefInfoGet(
            stockConId.toString(), "OPT", month, undefined, strike.toString(), right
        )
        //TODO: iserverSecdefInfoGet is annotated incorrectly in swagger json. Casting as temporary fix
        return (infoRes.body as SecdefInfo[])[0]
    }
}

