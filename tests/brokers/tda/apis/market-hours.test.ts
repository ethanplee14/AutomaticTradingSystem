import {TDAFetcher} from "../../../../src/brokers/tda/net/tda-fetcher";
import {OAuth2} from "../../../../src/brokers/tda/auth/oauth2";
import {TokenFile} from "../../../../src/brokers/tda/auth/token-file";
import {mocked} from "ts-jest/utils";
import {marketHours} from "../../../../src/brokers/tda/api/market-hours";


jest.mock('../../../../src/brokers/tda/net/tda-fetcher')

const mockedFetcherModule = mocked(TDAFetcher, true)
describe('tests for fetching tda market hours', function () {

    const fetcher = new TDAFetcher(new OAuth2("https://auth.endpoint.com", new TokenFile("rand/token/file")))
    const mockedFetcher = mocked(mockedFetcherModule.mock.instances[0], true)

    beforeEach(() => jest.clearAllMocks())

    it('should fetch options market hours', async function () {
        mockedFetcher.get.mockResolvedValue({"option": "Options market hours data!"})
        const hours = await marketHours(fetcher).singleMarket("OPTION", "2021-05-24")
        expect(mockedFetcher.get).toBeCalledWith('marketdata/OPTION/hours', {date: "2021-05-24"})
        expect(hours).toBe("Options market hours data!")
    });

    it('should fetch equities market hours', async function () {
        mockedFetcher.get.mockResolvedValue({"equity": "Equities market hours data!"})
        const hours = await marketHours(fetcher).singleMarket("EQUITY", "2020-12-01")
        expect(mockedFetcher.get).toBeCalledWith("marketdata/EQUITY/hours", {date: "2020-12-01"})
        expect(hours).toBe("Equities market hours data!")
    });
});