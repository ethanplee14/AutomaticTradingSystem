import {validChain} from "../../fixtures/securities/option-chain-samples";
import {
    verifyBidAskRatios,
    verifyOptionSpread,
    verifyPremiumSexyEnough
} from "../../../src/strategies/iron-condor/verify";


describe("testing verify option spread", function() {

    it('should verify option chain for iron condor', function () {
        const strikes = Object.keys(validChain["2021-04-16"]).map(k => parseInt(k))
        expect(verifyOptionSpread(116, strikes)).toBeTruthy()
    });

    it('should verify option chain as false because of wide strike spreads', function() {
        const strikes = [210, 220, 230, 240, 250, 260, 270, 280, 290, 300]
        expect(verifyOptionSpread(243.55, strikes)).toBeFalsy()
    })

    it('should verify option chain as true because center strikes within 5', function () {
        const strikes = [100, 110, 120, 125, 130, 135, 140, 145, 150, 160, 170, 180, 190, 200]
        expect(verifyOptionSpread(134, strikes)).toBeTruthy()
    });

    it('should verify option chain as true. Close to bounds', function() {
        const strikes = [10, 12, 14, 16, 18, 20, 22, 24, 26]
        expect(verifyOptionSpread(16, strikes as any)).toBeTruthy()
        expect(verifyOptionSpread(20, strikes as any)).toBeTruthy()
    })

    it('should verify option chain as false because not enough strikes within 5', function() {
        const strikes = [100, 110, 120, 130, 140, 145, 150, 165, 170, 180, 190, 200]
        expect(verifyOptionSpread(143, strikes as any)).toBeFalsy()
    })

    it('should verify option chain as false if not not enough strikes to step down', function () {
        const strikes = [20, 22, 24, 26, 27, 28, 30]
        expect(verifyOptionSpread(23.65, strikes as any)).toBeFalsy()
    });

    it('should verify option chain as false if not enough strikes to step up', function() {
        const strikes = [45, 50, 55, 60, 65, 70]
        expect(verifyOptionSpread(61.23, strikes as any)).toBeFalsy()
    })
})

describe("testing verify bid ask ratios", function() {

    it('should verify all option bid/ask ratios are valid for iron condor', function() {
        const aprChain = validChain["2021-04-16"]
        const options = [aprChain["105"].put, aprChain["103"].put, aprChain["130"].call, aprChain["135"].call]
        expect(verifyBidAskRatios(options)).toBeTruthy()
    })

    it('should verify all option bid/ask valid ratios', function () {
        const optionSpreads = [{bid: 100, ask: 110}, {bid: 4.3, ask: 5}, {bid: 66.5, ask: 78}]
        expect(verifyBidAskRatios(optionSpreads)).toBeTruthy()
    });

    it('should return false if ratio doesn\'t exceed .85', function () {
        const optionSpreads = [{bid: 100, ask: 110}, {bid: 4.3, ask: 5.1}, {bid: 66.5, ask: 72}]
        expect(verifyBidAskRatios(optionSpreads)).toBeFalsy()
    });
})

describe("tests if premiums are sexy enough to chase", function() {

    it("should verify premiums collected sexy enough", function() {
        const spreads = {
            ps: {bid: 14.5, ask: 15.5}, pb: {bid: 7.5, ask: 8.5},
            cs: {bid: 19, ask: 21}, cb: {bid: 11.5, ask: 12.5}
        }
        //15$ premium expected, 10$ premium wanted
        expect(verifyPremiumSexyEnough(.95, spreads)).toBeTruthy()
    })

    it('should verify premiums collected not sexy enough', function () {
        const spreads = {
            ps: {bid: 14.5, ask: 16.5}, pb: {bid: 7.5, ask: 9.5},
            cs: {bid: 19, ask: 21}, cb: {bid: 11.5, ask: 12.5}
        }
        //14.5$ premium expected, 20$ premium wanted
        expect(verifyPremiumSexyEnough(.85, spreads)).toBeFalsy()
    });

    it('should verify premium exactly sexy enough to chase after that b*tch', function() {
        const spreads = {
            ps: {bid: 20, ask: 22}, pb: {bid: 10, ask: 12},
            cs: {bid: 23, ask: 25}, cb: {bid: 11, ask: 13}
        }
        //22$ premium expected, 22$ premium wanted
        expect(verifyPremiumSexyEnough(.83, spreads)).toBeTruthy()
    })
})

