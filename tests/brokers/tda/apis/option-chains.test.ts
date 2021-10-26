import {mocked} from "ts-jest/utils";

import {TDAFetcher} from "../../../../src/brokers/tda/net/tda-fetcher";
import {optionChain} from '../../../../src/brokers/tda/api/option-chain'
import {OAuth2} from "../../../../src/brokers/tda/auth/oauth2";
import {TokenFile} from "../../../../src/brokers/tda/auth/token-file";

jest.mock('../../../../src/brokers/tda/net/tda-fetcher')

const mockedFetcherModule = mocked(TDAFetcher, true)

describe('test options chain endpoint', function() {

    const fetcher = new TDAFetcher(new OAuth2("https://auth.endpoint.com", new TokenFile("rand/token/file")))
    const mockedFetcher = mocked(mockedFetcherModule.mock.instances[0], true)

    beforeEach(() => jest.clearAllMocks())

    it('should fetch tda SNDL option chain', async function() {
        await optionChain(fetcher).getOptionChain("SNDL")
        expect(mockedFetcher.get).toBeCalledWith('marketdata/chains', {symbol: "SNDL"})
    })

    it('should fetch tda GME option chain calls', async function() {
        await optionChain(fetcher).getOptionChain("GME", {contractType: "CALL"})
        expect(mockedFetcher.get).toBeCalledWith('marketdata/chains', {symbol: "GME", contractType: "CALL"})
    })

    it('should fetch tda GME STRADDLE options in January', async function() {
        await optionChain(fetcher).getOptionChain("GME", {strategy: "STRADDLE", expMonth: "JAN"})
        expect(mockedFetcher.get).toBeCalledWith('marketdata/chains', {
            symbol: "GME", strategy: "STRADDLE", expMonth: "JAN"
        })
    })
})
