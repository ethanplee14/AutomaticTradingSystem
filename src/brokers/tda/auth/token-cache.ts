
export interface TokenCache {
    getTokens(): Tokens
    load(): Promise<Tokens>
    update(key: TokenKey, val: string): Tokens
    save(): Promise<any>
}

export type TokenKey = "code"|"access"|"refresh"|"clientId"

export type Tokens = {
    code: string,
    access: string,
    refresh: string,
    clientId: string
}

export function emptyTokens() {
    return {
        code: "",
        access: "",
        refresh: "",
        clientId: ""
    }
}
