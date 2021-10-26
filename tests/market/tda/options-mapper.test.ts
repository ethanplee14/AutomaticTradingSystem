import {normalizeTDAOption, normalizeTDAOptionChain} from "../../../src/market/tda/options-mapper";
import {afgSingleChain, afgSingleOption, afgTripleChain} from "../../fixtures/market/tda/afg-chain";

describe('tests for normalizing tda option data', function() {

    it('should map AFG call option values', function() {
        const afgTDACall = afgSingleOption.tda.callExpDateMap["2021-03-19:9"]["110.0"][0]
        const afgNormalizedCall = afgSingleOption.normal["2021-03-19"][110.0].call
        expect(normalizeTDAOption(afgTDACall)).toMatchObject(afgNormalizedCall)
    })

    it('should map AFG put option values', function() {
        const afgTDAPut = afgSingleOption.tda.putExpDateMap["2021-03-19:9"]["110.0"][0]
        const afgNormalizedPut = afgSingleOption.normal["2021-03-19"][110.0].put
        expect(normalizeTDAOption(afgTDAPut)).toMatchObject(afgNormalizedPut)
    })
})

describe("tests normalizing tda option chain", function() {

    it('should map AFG single option', function () {
        const normalizedTDAChain = normalizeTDAOptionChain(afgSingleOption.tda)
        expect(normalizedTDAChain).toMatchObject(afgSingleOption.normal)
    });

    it('should map AFG 1 complete option chain', function () {
        const normalizedTDAChain = normalizeTDAOptionChain(afgSingleChain.tda)
        expect(normalizedTDAChain).toMatchObject(afgSingleChain.normal)
    });

    it('should map 3 complete AFG options chain', function () {
        const normalizedTDAChain = normalizeTDAOptionChain(afgTripleChain.tda)
        expect(normalizedTDAChain).toMatchObject(afgSingleChain.normal)
    });
})