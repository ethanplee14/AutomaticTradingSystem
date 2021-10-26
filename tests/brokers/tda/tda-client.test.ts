import {mocked} from 'ts-jest/utils'

import {tdaClient} from '../../../src/brokers/tda'
import {TokenFile} from '../../../src/brokers/tda/auth/token-file'
import {optionChain} from "../../../src/brokers/tda/api/option-chain";
import {accounts} from "../../../src/brokers/tda/api/accounts";

jest.mock('../../../src/brokers/tda/auth/token-file')
jest.mock('../../../src/brokers/tda/api/option-chain')
jest.mock('../../../src/brokers/tda/api/accounts')
describe("testing optionChain integration", function(){

    const mockedOptionChains = mocked(optionChain, true)
    mockedOptionChains.mockReturnValue({
        getOptionChain: jest.fn()
    })
    const mockedTokenFile = mocked(new TokenFile('./rand/token/file'), true)
    const client = tdaClient(mockedTokenFile)

    it('should include optionChain endpoint', function() {
        expect(client.optionChain).toBeDefined()
        expect(client.optionChain.getOptionChain).toBeDefined()
    })

    it('should loadWinRates token file and call optionChain', async function() {
        const mockGetOptionChain = mocked(client.optionChain.getOptionChain, true)
        await client.optionChain.getOptionChain("RIOT")

        expect(mockedOptionChains).toBeCalled()
        expect(mockGetOptionChain).toBeCalledWith("RIOT")
    })
})

describe("testing accounts integration", function() {

    const mockedAccounts = mocked(accounts, true)
    mockedAccounts.mockReturnValue({
        getAccount: jest.fn(),
        getAccounts: jest.fn()
    })
    const mockedTokenFile = mocked(new TokenFile('./rand/token/file'), true)
    const client = tdaClient(mockedTokenFile)
    const accountId = "4859378593"

    it('should include accounts endpoint', function () {
        expect(client.accounts).toBeDefined()
        expect(client.accounts.getAccount).toBeDefined()
        expect(client.accounts.getAccounts).toBeDefined()
    });

    it('should call getAccount function', async function () {
        const mockGetAccount = mocked(client.accounts.getAccount, true)
        await client.accounts.getAccount(accountId)

        expect(mockedAccounts).toBeCalled()
        expect(mockGetAccount).toBeCalledWith(accountId)
    });

    it('should call getAccount function with fields', async function () {
        const mockGetAccount = mocked(client.accounts.getAccount, true)
        await client.accounts.getAccount(accountId, true)

        expect(mockGetAccount).toBeCalled()
        expect(mockGetAccount).toBeCalledWith(accountId, true)

        await client.accounts.getAccount(accountId, false, true)
        expect(mockGetAccount).toBeCalledWith(accountId, false, true)
    });
})

describe("testing quotes integration", function() {

    const client = tdaClient(new TokenFile(''))

    it('should include quotes endpoint', function () {
        expect(client.quotes).toBeDefined()
        expect(client.quotes.getQuote).toBeDefined()
        expect(client.quotes.getQuotes).toBeDefined()
    });
})

describe("testing market hours integration", function() {

    const client = tdaClient(new TokenFile(''))

    it('should include market hours endpoint', function () {
        console.log(client)
        expect(client.hours).toBeDefined()
        expect(client.hours.singleMarket).toBeDefined()
    });
})