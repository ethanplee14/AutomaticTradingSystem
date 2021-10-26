import {OptionChain as TDAOptionChain, Option as TDAOption} from "../../brokers/tda/types/option-chains";
import {OptionChain} from "../option";


export function normalizeTDAOptionChain(tdaOption: TDAOptionChain) {
    const optionChain: OptionChain = {}

    for (const tdaExpirationDate of Object.keys(tdaOption.callExpDateMap)) {
        const optionExpirationDate = tdaExpirationDate.split(":")[0]
        optionChain[optionExpirationDate] = {}
        const tdaCallMap = tdaOption.callExpDateMap[tdaExpirationDate]
        const tdaPutMap = tdaOption.putExpDateMap[tdaExpirationDate]

        for (const strike of Object.keys(tdaCallMap)) {
            const tdaCallOption = tdaCallMap[strike][0]
            const tdaPutOption = tdaPutMap[strike][0]
            optionChain[optionExpirationDate][parseFloat(strike)] = {
                call: normalizeTDAOption(tdaCallOption),
                put: normalizeTDAOption(tdaPutOption)
            }
        }
    }
    return optionChain
}

export function normalizeTDAOption(tdaOption: TDAOption) {
    return {
        strike: tdaOption.strikePrice,
        ask: tdaOption.ask, askSize: tdaOption.askSize,
        bid: tdaOption.bid, bidSize: tdaOption.bidSize,
        delta: tdaOption.delta, gamma: tdaOption.gamma,
        rho: tdaOption.rho, theta: tdaOption.theta,
        vega: tdaOption.vega, volatility: tdaOption.volatility,
        volume: tdaOption.totalVolume
    }
}