import fetch, {Response} from 'node-fetch'
import {mocked} from 'ts-jest/utils'

import {TDAFetcher} from "../../../../src/brokers/tda/net/tda-fetcher";
import {TokenFile} from "../../../../src/brokers/tda/auth/token-file";
import {randomStr} from "../../../test-utils/rand";
import {OAuth2} from "../../../../src/brokers/tda/auth/oauth2";
import {TokensNotFound} from "../../../../src/brokers/tda/auth/auth-errors";
import {RequestError} from "../../../../src/brokers/tda/net/req-error";

jest.mock('../../../../src/brokers/tda/auth/oauth2')
jest.mock('node-fetch')

const mockedAuthModule = mocked(OAuth2, true)
const mockFetch = mocked(fetch, true)

const authEndpoint = "https://api.tdameritrade.com/v1/oauth2/token"
const authenticator = new OAuth2(authEndpoint, new TokenFile('mock/token/file'))
const tdaFetcher = new TDAFetcher(authenticator)
const mockedAuthenticator = mocked(mockedAuthModule.mock.instances[0])


describe("tests tda fetcher get", function() {

    beforeEach(() => {
        mockedAuthenticator.accessToken.mockReset()
        mockFetch.mockReset()
    })

    it('should fetch GME\'s price history', async function () {
        const randAccess = randomStr(10)
        mockedAuthenticator.accessToken.mockReturnValue(Promise.resolve(randAccess))
        mockFetch.mockReturnValue(Promise.resolve({
            json: () => Promise.resolve({msg: "GME data set"})
        } as Response))

        const gmePriceHistory = await tdaFetcher.get("marketdata/GME/pricehistory")

        const requestUrl = TDAFetcher.BASE_URL + "marketdata/GME/pricehistory?"
        const headers = {Authorization: `Bearer ${randAccess}`}

        expect(mockedAuthenticator.accessToken).toBeCalled()
        expect(mockFetch).toBeCalledWith(requestUrl, {headers})
        expect(gmePriceHistory).toMatchObject({msg: "GME data set"})
    });

    it('should fetch GME\'s price history with period and frequency params', async function () {
        const randAccess = randomStr(10)
        mockedAuthenticator.accessToken.mockReturnValue(Promise.resolve(randAccess))
        mockFetch.mockReturnValue(Promise.resolve({
            json: () => Promise.resolve({msg: "GME data set"})
        } as Response))

        await tdaFetcher.get("marketdata/GME/pricehistory", {period: 1, frequency: 30})

        const requestUrl = TDAFetcher.BASE_URL + "marketdata/GME/pricehistory?period=1&frequency=30"
        const headers = {Authorization: `Bearer ${randAccess}`}

        expect(mockedAuthenticator.accessToken).toBeCalled()
        expect(mockFetch).toBeCalledWith(requestUrl, {headers})
    });

    it('should fetch Option chain with more search queries' , async function () {
        const randAccess = randomStr(10)
        mockedAuthenticator.accessToken.mockReturnValue(Promise.resolve(randAccess))
        mockFetch.mockReturnValue(Promise.resolve({
            json: () => Promise.resolve({msg: "Option's fake data set"})
        } as Response))

        const query = {
            symbol: "ELY", fromDate: "2021-02-11",
            toDate: "2021-02-12", contractType: "CALL"
        }
        await tdaFetcher.get("marketdata/chains", query)

        const requestUrl = TDAFetcher.BASE_URL + "marketdata/chains?symbol=ELY&fromDate=2021-02-11&toDate=2021-02-12&contractType=CALL"
        const headers = {Authorization: `Bearer ${randAccess}`}

        expect(mockedAuthenticator.accessToken).toBeCalled()
        expect(mockFetch).toBeCalledWith(requestUrl, {headers})
    });

    it('should raise TokenNotFound error from oauth access token', function () {
        mockedAuthenticator.accessToken.mockImplementation(() => {
            throw new TokensNotFound("No authentication or refresh token found")
        })
        return expect(tdaFetcher.get('marketdata/chains', {symbol: "ELY"}))
            .rejects.toThrow("No authentication or refresh token found")

    });

    it('should raise RequestError from oauth access token', function () {
        mockedAuthenticator.accessToken.mockImplementation(() => {
            throw new RequestError("The API key in request is either null or blank or invalid")
        })

        return expect(tdaFetcher.get('marketdata/chains', {symbol: "TWTR"}))
            .rejects.toThrow("The API key in request is either null or blank or invalid")
    });
})

describe('tests tda fetcher post', function() {
    beforeEach(() => {
        mockedAuthenticator.accessToken.mockReset()
        mockFetch.mockReset()
        mockFetch.mockReturnValue(Promise.resolve({
            json: () => Promise.resolve({msg: "Fake data set"})
        } as Response))
    })

    it('should place order for stock', async function () {
        const randAccess = randomStr(10)
        const randAccountId = randomStr(10)
        mockedAuthenticator.accessToken.mockReturnValue(Promise.resolve(randAccess))

        const body = {
            orderType: "MARKET",
            session: "NORMAL",
            duration: "DAY",
            orderStrategyType: "SINGLE",
            orderLegColelction: [
                {
                    instruction: "Buy",
                    quantity: 15,
                    instrument: {
                        symbol: "SCALE",
                        assetType: "Equity"
                    }
                }
            ]
        }

        await tdaFetcher.post(`accounts/${randAccountId}/orders`, body)

        const requestUrl = TDAFetcher.BASE_URL + `accounts/${randAccountId}/orders`
        expect(mockFetch).toBeCalledWith(requestUrl, {
            method: 'POST', body: JSON.stringify(body),
            headers: {Authorization: `Bearer ${randAccess}`}
        })
    });

    it('should place order for single option', async function() {
        const randAccess = randomStr(10)
        const randAccountId = randomStr(10)
        mockedAuthenticator.accessToken.mockReturnValue(Promise.resolve(randAccess))

        const body = {
            "complexOrderStrategyType": "NONE",
            "orderType": "LIMIT",
            "session": "NORMAL",
            "price": "6.45",
            "duration": "DAY",
            "orderStrategyType": "SINGLE",
            "orderLegCollection": [
                {
                    "instruction": "BUY_TO_OPEN",
                    "quantity": 10,
                    "instrument": {
                        "symbol": "XYZ_032015C49",
                        "assetType": "OPTION"
                    }
                }
            ]
        }

        await tdaFetcher.post(`accounts/${randAccountId}/orders`, body)

        const requestUrl = TDAFetcher.BASE_URL + `accounts/${randAccountId}/orders`
        expect(mockFetch).toBeCalledWith(requestUrl, {
            method: 'POST', body: JSON.stringify(body),
            headers: {Authorization: `Bearer ${randAccess}`}
        })
    })

    it('should place order for single option with no body', async function () {
        const randAccess = randomStr(10)
        const randAccountId = randomStr(10)
        mockedAuthenticator.accessToken.mockReturnValue(Promise.resolve(randAccess))

        await tdaFetcher.post(`accounts/${randAccountId}/orders`)

        const requestUrl = TDAFetcher.BASE_URL + `accounts/${randAccountId}/orders`
        expect(mockFetch).toBeCalledWith(requestUrl, {
            method: 'POST', headers: {Authorization: `Bearer ${randAccess}`}
        })
    });

    it('should raise TokenNotFound error from oauth access token', function () {
        mockedAuthenticator.accessToken.mockImplementation(() => {
            throw new TokensNotFound("No authentication or refresh token found")
        })

        return expect(tdaFetcher.post('accounts/randId/orders', {symbol: "ELY"}))
            .rejects.toThrow("No authentication or refresh token found")

    });

    it('should raise RequestError from oauth access token', function () {
        mockedAuthenticator.accessToken.mockImplementation(() => {
            throw new RequestError("The API key in request is either null or blank or invalid")
        })

        return expect(tdaFetcher.get('accounts/randId/orders', {symbol: "TWTR"}))
            .rejects.toThrow("The API key in request is either null or blank or invalid")
    });

    it('should raise RequestError from unauthorized oauth token', function() {
        mockedAuthenticator.accessToken.mockImplementation(() => {
            throw new RequestError("401: The API key is unauthorized.")
        })

        return expect(tdaFetcher.get('accounts/randId/orders', {symbol: "TWTR"}))
            .rejects.toThrow("401: The API key is unauthorized.")
    })
})


describe("tests tda fetcher nodeFetch", function() {

    beforeEach(() => {
        mockedAuthenticator.accessToken.mockReset()
        mockFetch.mockReset()
    })

    it('should not refresh token if access token is valid', async function () {
        const randAccess = randomStr(10)
        mockedAuthenticator.accessToken.mockResolvedValue(randAccess)
        mockFetch.mockReturnValue(Promise.resolve({
            json: () => Promise.resolve({msg: "Here's your data"})
        } as Response))

        const res = await tdaFetcher.fetch("random/endpoint")
        expect(mockedAuthenticator.refreshAccessTokens).not.toHaveBeenCalled()
        expect(mockFetch).toBeCalledTimes(1)
        expect(mockFetch).toHaveBeenLastCalledWith(TDAFetcher.BASE_URL + "random/endpoint", {
            headers: {Authorization: `Bearer ${randAccess}`}
        })
        expect(res).toMatchObject({msg: "Here's your data"})
    });

    it('should refresh token if error is returned', async function() {
        const randAccess = randomStr(10)
        mockFetch.mockReturnValueOnce(Promise.resolve({
            json: () => Promise.resolve({error: "The access token being passed has expired or is invalid."})
        } as Response))
            .mockReturnValueOnce(Promise.resolve({
                json: () => Promise.resolve({msg: "Here's your data"})
            } as Response))
        mockedAuthenticator.refreshAccessTokens.mockResolvedValue(randAccess as any)

        const res = await tdaFetcher.fetch("some/random/endpoint")
        expect(mockedAuthenticator.refreshAccessTokens).toBeCalled()
        expect(mockFetch).toBeCalledTimes(2)
        expect(mockFetch).toHaveBeenLastCalledWith(TDAFetcher.BASE_URL + "some/random/endpoint", {
            headers: {Authorization: `Bearer ${randAccess}`}
        })
        expect(res).toMatchObject({msg: "Here's your data"})
    })
})
