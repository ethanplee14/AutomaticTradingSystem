import nodeFetch, {RequestInit} from 'node-fetch'
import queryString from 'querystring'
import {OAuth2} from "../auth/oauth2";


export class TDAFetcher {

    static readonly BASE_URL = "https://api.tdameritrade.com/v1/"
    private authenticator

    /**
     * Creates TDAFetcher using the authenticator to access TD Ameritrade's http fetches to the api.
     * @param authenticator for OAuth2 authentication
     */
    constructor(authenticator: OAuth2) {
        this.authenticator = authenticator
    }

    async get(endpoint: string, query?: {[key: string]: any}) {
        const encodedEndpoint = `${endpoint}?${queryString.encode(query)}`
        return this.fetch(encodedEndpoint)
    }

    async post(endpoint: string, body?: {[key: string]: any}) {
        return this.fetch(endpoint, {method: "POST", body: JSON.stringify(body)})
    }

    /**
     * http fetch requests to TDA endpoints with access token retrieved by authenticator. Will automatically refresh
     * if token is expired
     * @param endpoint TDA endpoint path
     * @param init Node Fetch RequestInit options
     */
    async fetch(endpoint: string, init?: RequestInit) {
        const accessToken = await this.authenticator.accessToken()
        const urlStr = `${TDAFetcher.BASE_URL}${endpoint}`
        const defaultInit = {
            headers: {Authorization: `Bearer ${accessToken}`}
        }
        Object.assign(defaultInit, init)

        const res = await nodeFetch(urlStr, defaultInit).then(res => res.json())
        if (res.error === "The access token being passed has expired or is invalid.") {
            const refreshedAccessToken = await this.authenticator.refreshAccessTokens()
            defaultInit['headers']['Authorization'] = `Bearer ${refreshedAccessToken}`
            return nodeFetch(urlStr, defaultInit).then(res => res.json())
        }
        return res
    }
}

