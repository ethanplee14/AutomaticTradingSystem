import {premiumAbove} from "../../../../src/strategies/iron-condor/constraints/premium";

describe('tests iron condor premium above', function() {

    it('should return true', function() {
        const ic = [{bid: 1, ask: 1.5}, {bid: 3, ask: 3.5}, {bid: 2, ask: 2.5}, {bid: 6.5, ask: 7}]
        expect(premiumAbove(5, ic as any)).toBeTruthy()

        const icJustEnough = [
            {bid: 2.25, ask: 2.75}, {bid: 5.25, ask: 5.75},
            {bid: 3.75, ask: 4.25}, {bid: 5.75, ask: 6.25}
        ]
        expect(premiumAbove(5, icJustEnough as any)).toBeTruthy()
    })

    it('should return false', function () {
        const icJustEnough = [
            {bid: 2.25, ask: 2.75}, {bid: 5.25, ask: 5.75},
            {bid: 3.75, ask: 4.25}, {bid: 5.65, ask: 6.25}
        ]
        expect(premiumAbove(5, icJustEnough as any)).toBeFalsy()
    });
})