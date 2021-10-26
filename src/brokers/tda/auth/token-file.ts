import {promises as fs} from 'fs'
import {TokenCache, TokenKey, emptyTokens} from "./token-cache";

export class TokenFile implements TokenCache {

    private tokens = emptyTokens()
    private readonly filePath

    constructor(filePath: string) {
        this.filePath = filePath
    }

    getTokens() {
        const tokenCopy = emptyTokens()
        Object.assign(tokenCopy, this.tokens)
        return tokenCopy
    }

    async load() {
        const tokensStr = (await fs.readFile(this.filePath)).toString()
        this.tokens = JSON.parse(tokensStr)
        return this.getTokens()
    }

    /**
     * Updates token file of the key "code", "access", "refresh", "clientId". If the key
     * is none of these values, it is ignored.
     * @param key
     * @param val
     */
    update(key: TokenKey, val: string) {
        this.tokens[key] = val
        return this.getTokens()
    }

    async save() {
        await fs.writeFile(this.filePath, JSON.stringify(this.tokens, null, 2), "utf8")
    }
}


