import {nearestNumber} from "../../utils/math";

export type IronCondorStrikes = {
    ps: number, pb: number, cs: number, cb: number
}

export function calcStrikes(price: number, threshold: number, strikes: number[]) {
    const icStrikes = {
       pb: -1, ps: -1, cs: -1, cb: -1
    }

    const putPrice = price * (1-threshold)
    const callPrice = price * (1+threshold)
    icStrikes.ps = nearestNumber(putPrice, strikes)
    icStrikes.pb = strikes[strikes.indexOf(icStrikes.ps) - 1]
    icStrikes.cs = nearestNumber(callPrice, strikes)
    icStrikes.cb = strikes[strikes.indexOf(icStrikes.cs) + 1]

    if(!icStrikes.pb || !icStrikes.cb)
        return undefined
    return icStrikes
}