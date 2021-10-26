import {Option} from "../../../market/option";
import {roundTwoDec} from "../../../utils/math";

export function bidAskSpreadsEqualOrBelow(length: number, opts: Option[]) {
    return opts.every(opt => roundTwoDec(opt.ask - opt.bid) <= length)
}

export function legStrikeSpreadsEqual(opts: Option[]) {
    return (opts[1].strike - opts[0].strike) == (opts[3].strike - opts[2].strike)
}

