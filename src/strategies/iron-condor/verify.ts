import {nearestNumber, roundTwoDec} from "../../utils/math";


export function verifyOptionSpread(price: number, strikes: number[]) {
    const STEPS = 3
    const SPREAD_SIZE = 5
    const nearestStrikeIndex = strikes.indexOf(nearestNumber(price, strikes))

    const enoughStepsDown = nearestStrikeIndex >= STEPS
    const enoughStepsUp = (strikes.length-1) - nearestStrikeIndex >= STEPS
    if (!enoughStepsDown || !enoughStepsUp)
        return false

    const strikesPartial = strikes.slice(nearestStrikeIndex-STEPS, nearestStrikeIndex+STEPS)
    for (let i = 0; i < strikesPartial.length - 1; i++) {
        if(strikesPartial[i+1] - strikesPartial[i] > SPREAD_SIZE) {
            return false
        }
    }
    return true
}

export function verifyBidAskRatios(options: OptionSpread[], ratio: number = .85) {
    for (let option of options) {
        if (option.bid/option.ask < ratio)
            return false
    }
    return true
}

export function verifyPremiumSexyEnough(winrate: number, spreads: IronCondorSpread) {
    const avgPremium = (spread: OptionSpread) => (spread.bid + spread.ask)/2
    const putPremiums = avgPremium(spreads.ps) - avgPremium(spreads.pb)
    const callPremiums = avgPremium(spreads.cs) - avgPremium(spreads.cb)
    const totalPremiums = putPremiums + callPremiums
    const desiredPremiums = roundTwoDec((1 - winrate) * 100 + 5)
    return totalPremiums >= desiredPremiums
}

export type IronCondorSpread = {
    ps: OptionSpread, pb: OptionSpread,
    cs: OptionSpread, cb: OptionSpread
}

export type OptionSpread = {bid: number, ask: number}