
export class TokensNotFound extends Error {
    constructor(msg: string) {
        super(msg)
        this.name = "TokensNotFound"
    }
}