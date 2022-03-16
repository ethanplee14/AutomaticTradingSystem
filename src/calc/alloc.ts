import Decimal from "decimal.js";

export function kellyCriteria(winRate: Decimal, winAmt: Decimal, lossAmt: Decimal): Decimal {
    let winRatio = new Decimal(1)

    if(lossAmt.equals(0)){
        console.log("Set Win Ratio to 1")
        winRatio = new Decimal(1)
    } else {
        winRatio = winAmt.div(lossAmt)
    }
    // winRate - ((1-winRate) * winRatio)
    console.log(winRatio.mul((new Decimal(1).minus(winRate))))
    const kelly = winRate.sub(((new Decimal(1).minus(winRate)).mul(winRatio)))
    if(kelly < new Decimal(0)){
        return new Decimal(0)
    }
    return kelly
}

export function rankBasedAllocation(
    totalRanking: Decimal, individualRanking: Decimal,
    portfolioValue: number, currentShares: number,
    estimatedPrice: number, buyingPower=100000, liquidPortionOfPortfolio=.80
) {
    // As a future note it might be good to seperate this from the actual rebalancing that goes on and simply have this function return
    // the amount of shares that should be in the portfolio.
    const liquidityAvailable = portfolioValue * liquidPortionOfPortfolio
    const positionSizeAsPercentage = (individualRanking.div(totalRanking)).toNumber()
    // console.log(positionSizeAsPercentage)
    const positionSizeInDollars = positionSizeAsPercentage * liquidityAvailable
    const positionSizeInShares = positionSizeInDollars/estimatedPrice

    const sharesToBuyOrSell = parseInt((positionSizeInShares - currentShares).toFixed())
    // if(sharesToBuyOrSell * estimatedPrice > buyingPower){
    //     return buyingPower / estimatedPrice
    // }
    return sharesToBuyOrSell
}
