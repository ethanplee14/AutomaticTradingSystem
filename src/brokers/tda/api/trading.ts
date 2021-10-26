import {TDAFetcher} from "../net/tda-fetcher";

export function orders(tdaFetcher: TDAFetcher) {
    return {
        placeOrder: function(accountId: string, order: any) {
            const endpoint = `accounts/${accountId}/orders`
            return tdaFetcher.post(endpoint, order)
        },

        cancelOrder: function(accountId: string, orderId: string) {
            const endpoint = `accounts/${accountId}/orders/${orderId}`

        }
    }
}
