import ironCondorSettings from '../../../config/iron-condor.json'
import {IronCondor} from '../../../src/strategies/iron-condor'
import {MockBroker, MockMarketData} from "../../mocks/StrategyMocks";
import dateFormat from "dateformat";
import {round} from "../../../src/utils/math";

require('datejs')


jest.mock('../../../src/strategies/iron-condor/verify', () => ({
    verifyOptionSpread: jest.fn(), verifyBidAskRatios: jest.fn(),
    verifyPremiumSexyEnough: jest.fn()
}))
describe("Tests for placing trades", function () {

    const [broker, marketData] = [new MockBroker(), new MockMarketData()]
    let ironCondor: IronCondor

    beforeAll(() => {
        jest.useFakeTimers('modern')
    })

    beforeEach(() => {
        jest.clearAllMocks()
        ironCondorSettings.moneyness = 0.07
        ironCondor = new IronCondor()
    })

    afterAll(() => {
        jest.useRealTimers()
    })


    it('should place iron condor trade an hour after trading starts', async function () {
        mockMarketHours(2021, 4, 21)
        jest.setSystemTime(new Date(2021, 4, 21, 7, 29))
        const expire = new Date(2021, 4, 28)
        stageICData({"PLTR": 20.56}, expire)

        await ironCondor.run(broker, marketData)

        expect(marketData.stockQuote).not.toHaveBeenCalledWith("PLTR")
        expect(marketData.getOptionChain).not.toHaveBeenCalledWith("PLTR")
        expect(broker.placeOptionOrders).not.toHaveBeenCalled()

        jest.setSystemTime(new Date(2021, 4, 21, 7, 30))
        await ironCondor.run(broker, marketData)
        expectIronCondorPlaced("PLTR", expire, [18.5, 19, 22, 22.5])
    });

    it('should not place ic trade if out of trading hours', async function() {
        mockMarketHours(2021, 4, 21)

        jest.setSystemTime(new Date(2021, 4, 21, 6, 45))
        await ironCondor.run(broker, marketData)

        expect(marketData.stockQuote).not.toHaveBeenCalled()
        expect(marketData.getOptionChain).not.toHaveBeenCalled()
        expect(broker.placeOptionOrders).not.toHaveBeenCalled()

        jest.setSystemTime(new Date(2021, 4, 21, 13))
        await ironCondor.run(broker, marketData)

        expect(marketData.stockQuote).not.toHaveBeenCalled()
        expect(marketData.getOptionChain).not.toHaveBeenCalled()
        expect(broker.placeOptionOrders).not.toHaveBeenCalled()
    })

    it('should not place iron condor trade Monday - Thursday', async function () {
        for(let i = 0; i < 4; i++) {
            mockMarketHours(2021, 4, 17+1)
            jest.setSystemTime(new Date(2021, 4, 17+i, 12))
            await ironCondor.run(broker, marketData)
            expect(marketData.stockQuote).not.toHaveBeenCalled()
            expect(marketData.getOptionChain).not.toHaveBeenCalled()
            expect(broker.placeOptionOrders).not.toHaveBeenCalled()
        }
    });

    it('should place iron condor trade on Thursday if Friday is closed', async function() {
        marketData.marketHrs.mockImplementation((market, dateStr) => {
            const date = new Date(dateStr)
            if(date.getDay() == 4) {
                return {dayOpen: false}
            } else {
                return {
                    start: Date.parse(dateStr).addHours(6).addMinutes(30),
                    end: Date.parse(dateStr).addHours(13),
                    dayOpen: true
                }
            }
        })

        //tests no trades placed on M, T, W, F
        for (let day of [0, 1, 2, 4]) {
            jest.setSystemTime(new Date(2021, 3, 12+day, 12))
            await ironCondor.run(broker, marketData)
            expect(marketData.stockQuote).not.toHaveBeenCalled()
            expect(marketData.getOptionChain).not.toHaveBeenCalled()
            expect(broker.placeOptionOrders).not.toHaveBeenCalled()
        }

        //test trade placed on Thu
        jest.setSystemTime(new Date(2021, 3, 15, 12))
        const expire = new Date(2021, 3, 23)
        stageICData({"ELY": 35.20}, expire)

        await ironCondor.run(broker, marketData)

        expect(marketData.stockQuote).toHaveBeenCalled()
        expect(marketData.getOptionChain).toHaveBeenCalled()
        expectIronCondorPlaced("ELY", expire, [32, 32.5, 37.5, 38])
    })

    it('should place iron condor trade expire on thursday if friday is closed', async function() {
        mockMarketHours(2021, 4, 7)
        jest.setSystemTime(new Date(2021, 4, 7, 12))
        const expire = new Date(2021, 4, 13)
        stageICData({"NVDA": 625.91}, expire, 0.07, 1)

        await ironCondor.run(broker, marketData)

        expect(marketData.stockQuote).toHaveBeenCalledWith("NVDA")
        expect(marketData.getOptionChain).toHaveBeenCalledWith("NVDA")
        expectIronCondorPlaced("NVDA", expire, [581, 582, 670, 671])
    })

    it('should not place order if constraint is false', async function () {
        mockMarketHours(2021, 4, 21)
        jest.setSystemTime(new Date(2021, 4, 21, 12))
        const expire = new Date(2021, 4, 28)
        stageICData({"PLTR": 20.56}, expire)

        ironCondor.addConstraint(_ => false)
        await ironCondor.run(broker, marketData)

        expect(marketData.stockQuote).toHaveBeenCalledWith("PLTR")
        expect(marketData.getOptionChain).toHaveBeenCalledWith("PLTR")
        expect(broker.placeOptionOrders).toBeCalledWith()
    });

    it('should not place order if any constraint returns false', async function() {
        mockMarketHours(2021, 4, 21)
        jest.setSystemTime(new Date(2021, 4, 21, 12))
        const expire = new Date(2021, 4, 28)
        marketData.marketHrs.mockResolvedValue({ dayOpen: true })
        stageICData({"PLTR": 20.56}, expire)

        ironCondor.addConstraint(_ => Promise.resolve(true))
        ironCondor.addConstraint(_ => true)
        ironCondor.addConstraint(_ => false)
        ironCondor.addConstraint(_ => true)
        await ironCondor.run(broker, marketData)

        expect(marketData.stockQuote).not.toHaveBeenCalledWith("PLTR")
        expect(marketData.getOptionChain).not.toHaveBeenCalledWith("PLTR")
        expect(broker.placeOptionOrders).not.toBeCalledWith()
    })

    it('should place order if constraints all return true', async function () {
        mockMarketHours(2021, 4, 21)
        jest.setSystemTime(new Date(2021, 4, 21, 12))
        const expire = new Date(2021, 4, 28)
        stageICData({"PLTR": 20.56}, expire)

        ironCondor.addConstraint(_ => true)
        ironCondor.addConstraint(_ => true)
        ironCondor.addConstraint(_ => true)
        ironCondor.addConstraint(_ => true)
        await ironCondor.run(broker, marketData)

        expect(marketData.stockQuote).toHaveBeenCalledWith("PLTR")
        expect(marketData.getOptionChain).toHaveBeenCalledWith("PLTR")
        expectIronCondorPlaced("PLTR", expire, [18.5, 19, 22, 22.5])
    });

    it('should place iron condor trade for multiple stocks', async function () {
        const stockPrices = {
            CZR: 100.21,
            MSFT: 245.17,
            AMD: 77.17
        }
        mockMarketHours(2021, 4, 7)
        jest.setSystemTime(new Date(2021, 4, 7, 12))
        const expire = new Date(2021, 4, 14)
        stageICData(stockPrices, expire)

        await ironCondor.run(broker, marketData)

        Object.keys(stockPrices).forEach(sym => {
            expect(marketData.stockQuote).toHaveBeenCalledWith(sym)
            expect(marketData.getOptionChain).toHaveBeenCalledWith(sym)
        })
        expectIronCondorPlaced("CZR", expire, [92.5, 93, 107, 107.5])
        expectIronCondorPlaced("MSFT", expire, [227.5, 228, 262.5, 263])
        expectIronCondorPlaced("AMD", expire, [71.5, 72, 82.5, 83])

    });

    function expectIronCondorPlaced(symbol: string, expire: Date, strikes: number[]) {
        expect(broker.placeOptionOrders).toBeCalledWith(
            expect.objectContaining({
                symbol, strike: strikes[0], expire, side: "buy", right: "put", type: "MKT"
            }),
            expect.objectContaining({
                symbol, strike: strikes[1], expire, side: "sell", right: "put", type: "MKT"
            }),
            expect.objectContaining({
                symbol, strike: strikes[2], expire, side: "sell", right: "call", type: "MKT"
            }),
            expect.objectContaining({
                symbol, strike: strikes[3], expire, side: "buy", right: "call", type: "MKT"
            })
        )
    }

    function mockMarketHours(year?: number, month?: number, day?: number) {
        if(year == undefined || month == undefined || day == undefined) {
            marketData.marketHrs.mockResolvedValue({ dayOpen: false })
        }else {
            marketData.marketHrs.mockResolvedValue({
                dayOpen: true,
                start: new Date(year, month, day, 6, 30),
                end: new Date(year, month, day, 13)
            })
        }
    }

    function stageICData(stockPrices: Record<string, number>, expire: Date, threshold=0.07, step=0.5) {
        ironCondorSettings.stockList = Object.keys(stockPrices)
        marketData.stockQuote.mockImplementation(symbol => {
            if (!(symbol in stockPrices))
                return {}

            const res = {
                [symbol]: {symbol, price: stockPrices[symbol]}
            }
            return res
        })
        marketData.getOptionChain.mockImplementation(symbol => {
            if(!(symbol in stockPrices))
                return {}

            const strikeListStart = round(stockPrices[symbol] * (1-threshold), step) - step
            const strikeListEnd = round(stockPrices[symbol] * (1+threshold), step) + step
            const strikeListLength = (strikeListEnd - strikeListStart) / step
            const strikeList = []

            const optMap: any = {}
            for(let i = 0; i <= strikeListLength; i++) {
                const strike = strikeListStart + (i * step)
                strikeList.push(strikeListStart + (i * step))

                optMap[strike.toString()] = {
                    put: {
                        strike, bid: 1, ask: 1.5
                    },
                    call: {
                        strike, bid: 1, ask: 1.5
                    }
                }
            }
            const expireStr = dateFormat(expire, "yyyy-mm-dd")
            return {[expireStr]: optMap}
        })
    }
})

