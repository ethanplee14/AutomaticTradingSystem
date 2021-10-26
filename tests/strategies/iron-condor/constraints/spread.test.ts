import {legStrikeSpreadsEqual, bidAskSpreadsEqualOrBelow} from "../../../../src/strategies/iron-condor/constraints/spread";

describe('tests options bid ask spread threshold constraint', function () {

    it('should return true if spread is below 0.7', function () {
        const opts = [{bid: 1, ask: 1.7}]
        expect(bidAskSpreadsEqualOrBelow(0.7, opts as any)).toBeTruthy()

        const multiOpts = [{bid: 0.1, ask: 0.8}, {bid: 3.64, ask: 3.67}, {bid: 5.98, ask: 6.03}]
        expect(bidAskSpreadsEqualOrBelow(0.7, multiOpts as any)).toBeTruthy()
    });

    it('should return false if spread is below 0.7', function () {
        const opts = [{bid: 1, ask: 1.71}]
        expect(bidAskSpreadsEqualOrBelow(0.7, opts as any)).toBeFalsy()

        const multiOpts = [{bid: 0.1, ask: 0.8}, {bid: 3.64, ask: 4.5}, {bid: 5.98, ask: 6.03}]
        expect(bidAskSpreadsEqualOrBelow(0.7, multiOpts as any)).toBeFalsy()
    });

    it('should return true if spread is below 0.1', function () {
        const opts = [{bid: 5, ask: 5.1}]
        expect(bidAskSpreadsEqualOrBelow(.1, opts as any)).toBeTruthy()

        const multiOpts = [{bid: .5, ask: .6}, {bid: .8, ask: .85}, {bid: 3.3, ask: 3.34}]
        expect(bidAskSpreadsEqualOrBelow(0.1, multiOpts as any)).toBeTruthy()
    });

});

describe('tests iron condor legs spread equal', function() {

    it('should return true if equal', function() {
        const ic = [{strike: 19}, {strike: 19.5}, {strike: 22}, {strike: 22.5}]
        expect(legStrikeSpreadsEqual(ic as any)).toBeTruthy()

        const ic2 = [{strike: 250}, {strike: 251}, {strike: 262}, {strike: 263}]
        expect(legStrikeSpreadsEqual(ic2 as any)).toBeTruthy()
    })

    it('should return false if unequal', function () {
        const ic = [{strike: 52.5}, {strike: 53}, {strike: 59}, {strike: 60}]
        expect(legStrikeSpreadsEqual(ic as any)).toBeFalsy()

        const ic2 = [{strike: 2748}, {strike: 2749}, {strike: 2878}, {strike: 2880}]
        expect(legStrikeSpreadsEqual(ic2 as any)).toBeFalsy()
    });
})

