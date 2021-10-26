
export class RequestError extends Error {
    constructor(msg: string) {
        super(msg)

        Object.setPrototypeOf(this, RequestError.prototype)
    }
}