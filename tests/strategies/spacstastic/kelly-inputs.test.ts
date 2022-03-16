import {calcWinrate} from "../../../src/strategies/spactastic/kelly-inputs";
import {calcWinAmount} from "../../../src/strategies/spactastic/kelly-inputs";
import {calcLoseAmount} from "../../../src/strategies/spactastic/kelly-inputs";
import Decimal from "decimal.js";
import {expect} from "@jest/globals";

describe('Tests that the MVR in the calcWinrate returns the correct outputs', function (){
    it('should test when all inputs are 0 and y intercept', function () {
        const winRate = calcWinrate(new Decimal(0))
        expect(winRate).toEqual(new Decimal(.227221))
    });
    it('should test for a dfn of .31 and return .88954253', function () {
        const winRate = calcWinrate(new Decimal(.31))
        expect(winRate).toEqual(new Decimal(.88954251))
    });
    it('should test for a negative dfn and return .584656', function () {
        const winRate = calcWinrate(new Decimal(-.38))
        expect(winRate).toEqual(new Decimal(-.58465698))
    });
});

describe('Tests that the MVR in teh calcWinAmount returns the correct outputs', function () {
    it('should return the y intercept of the mvr when inputs are 0', function () {
        const winAmount = calcWinAmount(new Decimal(0))
        expect(winAmount).toEqual(new Decimal(0.004926))
    });
    it('should return .00122677', function () {
        const winAmount = calcWinAmount(new Decimal(.31))
        expect(winAmount).toEqual(new Decimal(.00122677))
    });
    it('should test for a negative dfn and return .00743193', function () {
        const winAmount = calcWinAmount(new Decimal(-.21))
        expect(winAmount).toEqual(new Decimal(.00743193))
    });
})

describe('Tests that the MVR in the calcLoseAmount returns the correct outputs', function (){
    it('should return the y intercept of the mvr when inputs are 0', function () {
        const loseAmount = calcLoseAmount(new Decimal(0))
        expect(loseAmount).toEqual(new Decimal(0.004926))
    });
    it('should return .0026058808 given an input of .34 ', function () {
        const loseAmount = calcLoseAmount(new Decimal(.34))
        expect(loseAmount).toEqual(new Decimal(.0026058808))
    });
    it('should return .00758731 given an input of -.39', function () {
        const loseAmount = calcLoseAmount(new Decimal(-.39))
        expect(loseAmount).toEqual(new Decimal(.0075873132))
    });
})
