import mockClient from '../../mocks/MockTDAClient'
import {afgSingleOption} from "../../fixtures/market/tda/afg-chain";
import {marketClosedSample, marketHoursSample} from "../../fixtures/market/tda/hours";
import {TDAMarketData} from "../../../src/market/tda/tda-market-data";
import {sampleQuotes} from "../../fixtures/market/tda/stock-quotes";


describe("Tests getting market data from TDAmeritrade", function() {

    const client = mockClient()
    const tdaMarketData = new TDAMarketData(client)

    it('should return normalized options chain afgSingleOption', async function () {
        client.optionChain.getOptionChain.mockResolvedValue(Promise.resolve(afgSingleOption.tda))
        const afgChain = await tdaMarketData.getOptionChain("AFG")
        expect(afgChain).toMatchObject(afgSingleOption.normal)
    });

    it('should return normalized stock quote', async function () {
        const symbol = "PLTR"
        client.quotes.getQuotes.mockResolvedValue({ PLTR: sampleQuotes["PLTR"] })
        const pltrQuote = await tdaMarketData.stockQuote("PLTR")
        expect(pltrQuote).toMatchObject({PLTR: {symbol, price: 27.0035}})
    });

    it('should return multiple normalized stock quote', async function() {
        const symbols = ["PLTR", "TWTR", "GOOG"]
        client.quotes.getQuotes.mockResolvedValue(sampleQuotes)
        const quotes = await tdaMarketData.stockQuote(...symbols)
        expect(quotes).toMatchObject({
            PLTR: {
                symbol: "PLTR",
                price: sampleQuotes.PLTR.lastPrice
            },
            TWTR: {
                symbol: "TWTR",
                price: sampleQuotes.TWTR.lastPrice
            },
            GOOG: {
                symbol: "GOOG",
                price: sampleQuotes.GOOG.lastPrice
            }
        })
    })

    it('should get market hours from TDAmeritrade', async function () {
        client.hours.singleMarket.mockResolvedValue(marketHoursSample)
        const hours = await tdaMarketData.equitiesMarketHours("EQUITY", "2021-05-24")
        expect(hours).toMatchObject({
            start: new Date("2021-05-24T09:30:00-04:00"), end: new Date("2021-05-24T16:00:00-04:00"),
            dayOpen: true
        })
    });

    it('should get closed market hours from TDAmeritrade', async function () {
        client.hours.singleMarket.mockResolvedValue(marketClosedSample)
        const hours = await tdaMarketData.equitiesMarketHours("OPTION", "2021-05-29")
        expect(hours).toMatchObject({dayOpen: false})
    });
})