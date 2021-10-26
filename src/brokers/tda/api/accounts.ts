import {TDAFetcher} from "../net/tda-fetcher";

export function accounts(tdaFetcher: TDAFetcher) {

    function buildFields(positions: boolean, orders: boolean) {
        const fields = []

        if (positions)
            fields.push("positions")
        if (orders)
            fields.push("orders")
        if (fields.length > 0)
            return "?fields=" + fields.join(',')

        return ""
    }

    return {
        getAccount: function(accountId: string, positions: boolean = false, orders: boolean = false) {
            return tdaFetcher.get(`accounts/${accountId}` + buildFields(positions, orders))
        },

        getAccounts: function(positions: boolean = false, orders: boolean = false) {
            return tdaFetcher.get("accounts" + buildFields(positions, orders))
        }
    }
}
