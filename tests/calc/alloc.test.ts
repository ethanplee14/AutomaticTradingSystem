import {kellyCriteria} from "../../src/calc/alloc"
import Decimal from "decimal.js";
import {rankBasedAllocation} from "../../src/calc/alloc";
import {expect} from "@jest/globals";

describe('tests to ensure kelly criteria allocs stock rankings', function () {

    beforeAll(() => Decimal.set({precision: 6, rounding: 5}))

    it('should return 0 if given 0s', function () {
        const ranking = kellyCriteria(new Decimal(0), new Decimal(0), new Decimal(0))
        expect(ranking).toEqual(new Decimal(0))
    });

    it('should return a ranking of 0 based on equal payout and .50 winrate', function() {
        const ranking = kellyCriteria(new Decimal(.5), new Decimal(1), new Decimal(1))
        expect(ranking).toEqual(new Decimal(0))
    })

    it('should return a winrate of 1.019 given the kelly inputs', function(){
      const ranking = kellyCriteria(new Decimal(1.0177), new Decimal(.000511), new Decimal(.005631))
        expect(ranking).toEqual(new Decimal(1.01931))
    })
    it('should return a winrate of given negative kelly inputs', function () {
        const ranking = kellyCriteria(new Decimal(.1), new Decimal(1), new Decimal(-1))
        expect(ranking).toEqual(new Decimal(1))
    });
});

describe('tests if the rebalancer returns the correct order quantities', function (){
    it('should return quantity of 0 given a ranking of 0', function () {
        const ranking = new Decimal(0)
        const totalRanking = new Decimal(100)
        const portfolioValue = 100000
        const buyingPower = 100000
        const currentShares = 0
        const estimatedPrice = 10.70
        const shares = rankBasedAllocation(totalRanking, ranking, portfolioValue, currentShares, estimatedPrice)
        expect(shares).toBe(0)
    });
    it('should liquidate the position given a ranking of 0 and positive position size', function () {
        const ranking = new Decimal(0)
        const totalRanking = new Decimal(100)
        const portfolioValue = 100000
        const buyingPower = 10000
        const currentShares = 100
        const estimatedPrice = 10.70
        const shares = rankBasedAllocation(totalRanking, ranking, portfolioValue, currentShares, estimatedPrice)
        expect(shares).toBe(-100)

    });
    it('should return 20 shares given a ranking of 20%', function () {
        const ranking = new Decimal(.2)
        const totalRanking = new Decimal(1)
        const portfolioValue = 100000
        const buyingPower = 100000
        const currentShares = 0
        const estimatedPrice = 10.00
        const shares = rankBasedAllocation(totalRanking, ranking, portfolioValue, buyingPower, currentShares, estimatedPrice)
        expect(shares).toBe(1600)
    });
    it('should test for selling a small amount of shares to rebalance', function () {
        const ranking = new Decimal(.1212)
        const totalRanking = new Decimal(1.0914)
        const portfolioValue = 117100
        const buyingPower = 0
        const currentShares = 1100
        const estimatedPrice = 9.63
        const shares = rankBasedAllocation(totalRanking, ranking, portfolioValue, currentShares, estimatedPrice)
        expect(shares).toBe(-20)
    });
    it('should buy shares when presented with a negative share quantity', function () {
        const ranking = new Decimal(0)
        const totalRanking = new Decimal(1.67)
        const portfolioValue = 117100
        const buyingPower = 100000
        const currentShares = -100
        const estimatedPrice = 9.63
        const shares = rankBasedAllocation(totalRanking, ranking, portfolioValue, currentShares, estimatedPrice)
        expect(shares).toBe(100)
    });
    it('should return the max shares to buy given the buying power', function () {
        const ranking = new Decimal(1)
        const totalRanking = new Decimal(1)
        const portfolioValue = 10000
        const buyingPower = 1000
        const currentShares = 0
        const estimatedPrice = 10.00
        const shares = rankBasedAllocation(totalRanking, ranking, portfolioValue, currentShares, estimatedPrice, buyingPower)
        expect(shares).toBe(100)
    });
})
