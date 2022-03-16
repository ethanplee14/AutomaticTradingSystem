import {Spactastic} from "../../../src/strategies/spactastic";

describe('tests for Spactastic strategy', function () {

    const mockBroker = {
        placeEquitiesOrders: jest.fn(),
        placeOptionOrders: jest.fn(),
        cashBal: jest.fn(),
        buyingPower: jest.fn(),
        positions: jest.fn(),
        portfolio: jest.fn()
    }
    const mockMarketData = {
        stockQuote: jest.fn(),
        getOptionChain: jest.fn(),
        marketHrs: jest.fn(),
        currentlyOpen: jest.fn(),
        endOfWeek: jest.fn()
    }
    const mockSpacLookup = jest.fn()

    beforeEach(() => jest.resetAllMocks())

    it('should only run if market is open', async function() {
        const mockMarketHrs = {
            isOpen: false,
            end: {addHours: jest.fn()}
        }
        mockMarketData.marketHrs.mockResolvedValue(mockMarketHrs)

        const strategy = new Spactastic(mockSpacLookup)
        await strategy.run(mockBroker, mockMarketData)
        expect(mockMarketHrs.end.addHours).not.toHaveBeenCalled()

        mockMarketHrs.isOpen = true
        await strategy.run(mockBroker, mockMarketData)
        expect(mockMarketHrs.end.addHours).toHaveBeenCalled()
    })


    it('should only run an hour before market closes', async function () {
        const mockMarketHrs = {isOpen: true, end: {addHours: jest.fn()}}
        mockMarketData.marketHrs.mockResolvedValue(mockMarketHrs)

        mockMarketHrs.end.addHours.mockReturnValue(new Date(2022, 2, 8, 13, 29, 0))
        const strategy = new Spactastic(mockSpacLookup)
        await strategy.run(mockBroker, mockMarketData)
        expect(mockSpacLookup).not.toHaveBeenCalled()

        mockMarketHrs.end.addHours.mockReturnValue(new Date(2022, 2, 8, 13, 30, 0))
        await strategy.run(mockBroker, mockMarketData)
        expect(mockSpacLookup).toHaveBeenCalled()
    });

    // it('should not run if portfolio value is 0', async function () {
    //     const strategy = new Spactastic(mockSpacLookup)
    //     const mockCashAndPortfolio = {cash: 0, stocks: 0}
    //     mockBroker.portfolio.mockResolvedValue(mockCashAndPortfolio)
    //     mockSpacLookup = jest.fn()
    //
    //     await strategy.run(mockBroker, mockMarketData)
    //
    //     broker.placeEquitiesOrders
    // });
});
