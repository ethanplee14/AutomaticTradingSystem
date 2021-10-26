import fetch, {RequestInfo, RequestInit, Response} from 'node-fetch'
import {mocked} from 'ts-jest/utils'
import queryString from 'querystring'

import {randomStr} from '../../../test-utils/rand'
import {TokenFile} from "../../../../src/brokers/tda/auth/token-file";
import {emptyTokens, Tokens} from "../../../../src/brokers/tda/auth/token-cache";
import {OAuth2} from '../../../../src/brokers/tda/auth/oauth2'
import {TokensNotFound} from "../../../../src/brokers/tda/auth/auth-errors";

jest.mock('node-fetch')
jest.mock('../../../../src/brokers/tda/auth/token-file')


const mockedTokenFileModule = mocked(TokenFile, true)
const mockedFetch = mocked(fetch, true)

describe('tests for oauth 2.0 authentication', function () {

    const authUrl = 'https://api.tdameritrade.com/v1/oauth2/token'
    const auth = new OAuth2(authUrl, new TokenFile("mock/file"))
    const mockedTokenFile = mocked(mockedTokenFileModule.mock.instances[0], true)
    let mockTokens: Tokens

    beforeEach(() => {
        mockTokens = {
            code: "", access: "", refresh: "",
            clientId: randomStr(10)
        }
        mockedTokenFile.getTokens.mockClear()
        mockedTokenFile.update.mockClear()
        mockedTokenFile.save.mockClear()
        mockedFetch.mockClear()
    })

    it('should return access token', async function () {
        mockTokens['access'] = randomStr(10)
        mockedTokenFile.getTokens.mockReturnValue(mockTokens)
        expect(await auth.accessToken()).toBe(mockTokens['access'])
    });

    it('should nodeFetch access token with refresh token', async function () {
        mockTokens['refresh'] = randomStr(10)
        const randAccess = randomStr(10)
        mockedTokenFile.getTokens.mockReturnValue(mockTokens)


        mockFetchAuth((urlInfo, init?) => {
            try {
                const form = queryString.decode(init?.body as string)
                if (init?.method?.toUpperCase() === "POST" && form["client_id"] && form["refresh_token"]) {
                    return {
                        access_token: randAccess,
                        scope: "PlaceTrades AccountAccess MoveMoney",
                        expires_in: 1800,
                        token_type: "Bearer"
                    }
                }
            } catch(e) {
                console.log(e)
                return {error: "Fetching access token has error"}
            }
        })

        const expectedBody = {
            grant_type: "refresh_token",
            client_id: mockTokens['clientId'] + "@AMER.OAUTHAP",
            refresh_token: mockTokens['refresh']
        }

        const headers = {"Content-Type": "application/x-www-form-urlencoded"}

        expect(await auth.accessToken()).toBe(randAccess)
        expect(mockedFetch).toHaveBeenCalledWith(authUrl, {
            method: 'POST', headers, body: queryString.encode(expectedBody)
        })
        expect(mockedTokenFile.update).toBeCalledWith("access", randAccess)
        expect(mockedTokenFile.save).toBeCalled()
    });

    it('should return access token without refreshing', async function() {
        mockTokens['access'] = randomStr(10)
        mockTokens['refresh'] = randomStr(10)

        mockedTokenFile.getTokens.mockReturnValue(mockTokens)

        expect(mockedFetch).not.toHaveBeenCalled()
        expect(await auth.accessToken()).toBe(mockTokens['access'])
        expect(mockedTokenFile.update).not.toHaveBeenCalled()
    })

    it('should throw error if no refresh and access token available', function () {
        mockedTokenFile.getTokens.mockReturnValue(mockTokens)
        return expect(auth.accessToken()).rejects.toThrow(TokensNotFound)
    });

    it('should throw error if fetching authentication returned error', function() {
        mockTokens['refresh'] = randomStr(10)
        mockedTokenFile.getTokens.mockReturnValue(mockTokens)

        mockFetchAuth((url: RequestInfo, init?: RequestInit) => {
            if (init?.method?.toUpperCase() === "POST" && init?.body) {
                return {error: "The API key in request is either null or blank or invalid"}
            }
        })
        return expect(auth.accessToken()).rejects.toThrow("The API key in request is either null or blank or invalid")
    })

    it('should refresh access token if refresh token is found', async function() {
        mockTokens["refresh"] = randomStr(10)
        const randAccess = randomStr(10)
        mockedTokenFile.getTokens.mockReturnValue(mockTokens)
        mockFetchAuth((url: RequestInfo, init?: RequestInit) => ({
            access_token: randAccess,
            scope: "PlaceTrades AccountAccess MoveMoney",
            expires_in: 1800,
            token_type: "Bearer"
        }))

        const accessToken = await auth.refreshAccessTokens()
        expect(mockedTokenFile.update).toBeCalledWith("access", randAccess)
        expect(mockedTokenFile.save).toBeCalled()
        expect(accessToken).toBe(randAccess)
    })

    it('should throw error for refreshAccessToken if no refresh token is found', async function() {
        mockedTokenFile.getTokens.mockReturnValue(mockTokens)
        return expect(auth.refreshAccessTokens()).rejects.toThrowError(TokensNotFound)
    })

    function mockFetchAuth(cbk: (url: RequestInfo, init?: RequestInit) => any) {
        mockedFetch.mockImplementation((url: RequestInfo, init?: RequestInit) => Promise.resolve({
            json: () => Promise.resolve(cbk(url, init))
        } as Response))
    }
});
