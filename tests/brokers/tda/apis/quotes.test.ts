import {mocked} from 'ts-jest/utils'

import {TDAFetcher} from "../../../../src/brokers/tda/net/tda-fetcher";
import {OAuth2} from "../../../../src/brokers/tda/auth/oauth2";
import {TokenFile} from "../../../../src/brokers/tda/auth/token-file";
import {quotes} from "../../../../src/brokers/tda/api/quotes";


jest.mock('../../../../src/brokers/tda/net/tda-fetcher')
describe('tests for tda quotes api', function() {

    new TDAFetcher(new OAuth2("", new TokenFile("")))
    const mockedFetcher = mocked(TDAFetcher).mock.instances[0]
    const quotesApi = quotes(mockedFetcher)

    beforeAll(() => {
        mockQuoteFetcherGet()
    })

    it('should have api endpoints', function () {
        expect(quotesApi.getQuote).toBeDefined()
        expect(quotesApi.getQuotes).toBeDefined()
    });

    it('should get request quote for GME', async function() {
        const fakeGMEQuote = {symbol: "GME"}
        const quote = await quotesApi.getQuote("GME")
        expect(quote).toMatchObject(fakeGMEQuote)
    })

    it('should get request quote for AFG', async function() {
        const quote = await quotesApi.getQuote("AFG")
        expect(quote).toMatchObject({symbol: "AFG"})
    })

    it('should request quotes for 3 stocks', async function() {
        const quotes = await quotesApi.getQuotes("SNDL", "PLTR", "TSLA")
        expect(quotes).toEqual([{symbol: "SNDL"}, {symbol: "PLTR"}, {symbol: "TSLA"}])
    })

    it('should request quotes for many stocks', async function () {
        const tickers = ["AFG", "GOOG", "PLTR", "GME", "AMC", "CAKE", "CURI", "ELY"]
        const quotes = await quotesApi.getQuotes(...tickers)
        expect(quotes).toEqual(tickers.map(t => ({symbol: t})))
    });

    function mockQuoteFetcherGet() {
        mocked(mockedFetcher.get).mockImplementation((endpoint: string, query?: {[p: string]: any}) => {
            const isSingularQuote = endpoint.split("/").length >= 3
            if (isSingularQuote)
                return Promise.resolve({
                    symbol: endpoint.split("/")[1]
                })
            else {
                const symbols = (query?.symbol as string).split(",").map(s => ({symbol: s}))
                return Promise.resolve(symbols)
            }
        })
    }
})