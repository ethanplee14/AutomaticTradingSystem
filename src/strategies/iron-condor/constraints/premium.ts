import {Option} from "../../../market/option";
import {roundTwoDec} from "../../../utils/math";

export function premiumAbove(val: number, opts: Option[]) {
    const putPrem = optMidVal(opts[1]) - optMidVal(opts[0])
    const callPrem = optMidVal(opts[3]) - optMidVal(opts[2])
    return roundTwoDec(putPrem + callPrem) >= val
}

function optMidVal(opt: Option) {
    return (opt.bid + opt.ask) / 2
}