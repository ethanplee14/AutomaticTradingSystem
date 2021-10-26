import fetch from "node-fetch";
import queryString from 'querystring'
import {TokensNotFound} from "./auth-errors";
import {RequestError} from "../net/req-error";
import {TokenCache} from "./token-cache";


export class OAuth2 {

    readonly url
    private readonly tokenCache

    constructor(url: string, tokenCache: TokenCache) {
        this.url = url
        this.tokenCache = tokenCache
    }

    /**
     * Attempts to return access token from the token file. If no access token is found, will attempt to refresh
     * using the refresh token.
     * @throws TokensNotFound - If access and refresh tokens are not found in file
     * @throws RequestError - If failed to make refresh request
     */
    async accessToken(): Promise<string> {
        //TODO: Consider loading tokens directly from here
        const tokens = this.tokenCache.getTokens()

        if (tokens['refresh'] && !tokens['access'])
            return this.refreshAccessTokens()
        else if (!tokens['access'] && !tokens['refresh'])
            throw new TokensNotFound("No authentication or refresh token found")

        return this.tokenCache.getTokens()['access']
    }

    /**
     * Attempts to refresh access token using found refresh token in TokenCache
     * @throws RequestError - If it fails to make refresh request
     * @throws TokensNotFound - If no refresh token is present
     */
    async refreshAccessTokens(): Promise<string> {
        const tokens = this.tokenCache.getTokens()

        if (!tokens.refresh)
            throw new TokensNotFound("No refresh token found")

        const query = {
            grant_type: "refresh_token",
            client_id: tokens.clientId + "@AMER.OAUTHAP",
            refresh_token: tokens.refresh
        }
        const auth = await fetch(this.url, {
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: queryString.encode(query)
        }).then(res => res.json())

        if ('error' in auth)
            throw new RequestError(auth['error'])

        this.tokenCache.update("access", auth["access_token"])
        this.tokenCache.save()
        return auth["access_token"]
    }

}