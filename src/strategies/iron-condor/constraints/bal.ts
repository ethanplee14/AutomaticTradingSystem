import {Ibkr} from "../../../brokers/ibkr/ibkr";
import {Option} from "../../../market/option";
import {roundTwoDec} from "../../../utils/math";


export async function hasAvailableFunds(ibkr: Ibkr, options: Option[]) {
    const putCollateral = options[1].strike - options[0].strike
    const callCollateral = options[3].strike - options[2].strike
    const collateral = roundTwoDec(Math.max(putCollateral, callCollateral)) * 100
    const cash = await ibkr.cashBal()

    return cash >= collateral
}