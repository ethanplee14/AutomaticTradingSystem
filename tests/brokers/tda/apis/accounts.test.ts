import {mocked} from "ts-jest/utils";

import {TDAFetcher} from "../../../../src/brokers/tda/net/tda-fetcher";
import {OAuth2} from "../../../../src/brokers/tda/auth/oauth2";
import {TokenFile} from "../../../../src/brokers/tda/auth/token-file";
import {accounts} from "../../../../src/brokers/tda/api/accounts";
import {randomStr} from "../../../test-utils/rand";

jest.mock('../../../../src/brokers/tda/net/tda-fetcher')

const mockedFetcherModule = mocked(TDAFetcher, true)

describe("test trading and account implementations", function() {

    const fetcher = new TDAFetcher(new OAuth2("https://auth.endpoint.com", new TokenFile("rand/token/file")))
    const mockedFetcher = mocked(mockedFetcherModule.mock.instances[0], true)

    beforeEach(() => {
        mockedFetcher.get.mockClear()
        mockedFetcher.get.mockReturnValue(Promise.resolve({securitiesAccount: "MockAccount"}))
    })

    it('should request single account', async function() {
        const accountId = randomStr(10)
        const account = await accounts(fetcher).getAccount(accountId)
        expect(mockedFetcher.get).toBeCalledWith(`accounts/${accountId}`)
        expect(account).toMatchObject({securitiesAccount: "MockAccount"})
    })

    it('should request single account with fields', async function () {
        const accountId = randomStr(10)
        let account = await accounts(fetcher).getAccount(accountId, true)
        expect(mockedFetcher.get).toBeCalledWith(`accounts/${accountId}?fields=positions`)
        expect(account).toMatchObject({securitiesAccount: "MockAccount"})

        account = await accounts(fetcher).getAccount(accountId, true, true)
        expect(mockedFetcher.get).toBeCalledWith(`accounts/${accountId}?fields=positions,orders`)
        expect(account).toMatchObject({securitiesAccount: "MockAccount"})
    });

    it('should request all accounts', async function () {
        const accs = await accounts(fetcher).getAccounts()
        expect(mockedFetcher.get).toBeCalledWith("accounts")
        expect(accs).toMatchObject({securitiesAccount: "MockAccount"})
    });

    it('should request all accounts with fields', async function() {
        const accountsWithPositions = await accounts(fetcher).getAccounts(true)
        expect(mockedFetcher.get).toBeCalledWith("accounts?fields=positions")
        expect(accountsWithPositions).toMatchObject({securitiesAccount: "MockAccount"})

        const accountsWithPositionsOrders = await accounts(fetcher).getAccounts(true, true)
        expect(mockedFetcher.get).toBeCalledWith("accounts?fields=positions,orders")
        expect(accountsWithPositionsOrders).toMatchObject({securitiesAccount: "MockAccount"})
    })
})