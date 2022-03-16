import Decimal from "decimal.js";
import {kellyCriteria} from "../../calc/alloc";

export function calcWinrate(distFromNav: Decimal){
    return distFromNav.mul("2.136521").plus(new Decimal(".227221"))
}

export function calcWinAmount(distFromNav: Decimal){
    return distFromNav.mul("-0.011933").plus("0.004926")
}

export function calcLoseAmount(distFromNav: Decimal){
    return distFromNav.mul("-0.00682388").plus("0.004926")
}

export function calcKellyRanking(price: Decimal, nav = new Decimal(10)) {
    const distFromNav = nav.minus(price)
    return kellyCriteria(
        calcWinrate(distFromNav),
        calcWinAmount(distFromNav),
        calcLoseAmount(distFromNav)
    )
}
