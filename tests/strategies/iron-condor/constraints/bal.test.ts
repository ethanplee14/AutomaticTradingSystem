import {mocked} from 'ts-jest/utils'
import {Ibkr} from "../../../../src/brokers/ibkr/ibkr";
import {hasAvailableFunds} from "../../../../src/strategies/iron-condor/constraints/bal";
import {Option} from "../../../../src/market/option";

jest.mock('../../../../src/brokers/ibkr/ibkr')
describe('tests ibkr account has funds for iron condor collateral', function () {

    const ibkr = new Ibkr("F999999")

    it('should have enough funds', async function () {
        mocked(ibkr.cashBal).mockResolvedValue(100)
        const strippedOptions = [18.5, 19, 22, 22.5].map(strike => ({strike}))
        const hasFunds = await hasAvailableFunds(ibkr, strippedOptions as Option[])
        expect(hasFunds).toBeTruthy()

        mocked(ibkr.cashBal).mockResolvedValue(50)
        const hasExactFunds = await hasAvailableFunds(ibkr, strippedOptions as Option[])
        expect(hasExactFunds).toBeTruthy()
    });

    it('should check funds for unequal leg collateral', async function () {
        mocked(ibkr.cashBal).mockResolvedValue(100)
        const strippedOptions = [18.5, 19, 22, 23].map(strike => ({strike}))
        const hasFunds = await hasAvailableFunds(ibkr, strippedOptions as Option[])
        expect(hasFunds).toBeTruthy()

        mocked(ibkr.cashBal).mockResolvedValue(99)
        const doesntHaveCallCollateralFunds = await hasAvailableFunds(ibkr, strippedOptions as Option[])
        expect(doesntHaveCallCollateralFunds).toBeFalsy()
    });


});