import {IbkrMarketData} from "../../../src/market/ibkr/ibkr-market-data";
require('datejs')

describe('tests for ibkr market hrs data', function () {

    //this really should be time zone agnostic. Originally developed in MST timezone

    it('should give appropriate market open and close dates', async function () {
        const ibkr = new IbkrMarketData({} as any)
        const marketHrs = await ibkr.marketHrs("EQUITY", new Date())
        expect(marketHrs.start?.toLocaleTimeString('en-US', {timeZone: 'America/New_York', hour12: false})).toBe("09:00:00")
        expect(marketHrs.end?.toLocaleTimeString('en-US', {timeZone: 'America/New_York', hour12: false})).toBe("16:30:00")
    });

    it('should return market is not open', async function () {
        const ibkr = new IbkrMarketData({} as any)
        let marketHours = await ibkr.marketHrs("EQUITY", new Date(2022, 2, 7, 16, 30, 0))
        expect(marketHours.isOpen).toBeFalsy()

        marketHours = await ibkr.marketHrs("EQUITY", new Date(2022, 2, 8, 14, 30, 0))
        expect(marketHours.isOpen).toBeFalsy()

        marketHours = await ibkr.marketHrs("EQUITY", new Date(2022, 2, 10, 6, 59, 59))
        expect(marketHours.isOpen).toBeFalsy()
    });

    it('should return market is open', async function () {
        const ibkr = new IbkrMarketData({} as any)
        let marketHours = await ibkr.marketHrs("EQUITY", new Date(2022, 0, 26, 7, 0, 0))
        expect(marketHours.isOpen).toBeTruthy()

        marketHours = await ibkr.marketHrs("EQUITY", new Date(2022, 0, 26, 12, 0, 0))
        expect(marketHours.isOpen).toBeTruthy()

        marketHours = await ibkr.marketHrs("EQUITY", new Date(2022, 0, 26, 14, 29, 0))
        expect(marketHours.isOpen).toBeTruthy()
    });

    it('should return market is closed on weekends', async function() {
        const ibkr = new IbkrMarketData({} as any)
        let marketHours = await ibkr.marketHrs("EQUITY", new Date(2022, 1, 5, 12, 0, 0)) // Saturday
        expect(marketHours.isOpen).toBeFalsy()

        marketHours = await ibkr.marketHrs("EQUITY", new Date(2022, 1, 6, 12, 0, 0)) // Sunday
        expect(marketHours.isOpen).toBeFalsy()
    })
});
