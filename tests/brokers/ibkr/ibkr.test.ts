import dateFormat from "dateformat";

import {Ibkr} from "../../../src/brokers/ibkr/Ibkr";
import {OptionOrder} from "../../../src/brokers/option-order";
import {mocked} from "ts-jest/utils";
import {ContractApi, OrderApi, AccountApi} from "../../../src/brokers/ibkr/swagger";
import {randomIntRange} from "../../../src/utils/math";
import {mockResolvedOnce} from "../../test-utils/swagger";
import {accountSummary} from "../../fixtures/broker/account";
require('datejs')


jest.mock('../../../src/brokers/ibkr/swagger/api/ContractApi')
jest.mock('../../../src/brokers/ibkr/swagger/api/OrderApi')
jest.mock('../../../src/brokers/ibkr/swagger/api/AccountApi')

const accountId = "F999999"
let ibkr = new Ibkr(accountId)

describe('Ibkr place order tests', function () {

    const mockedContract = mocked(mocked(ContractApi).mock.instances[0])
    const mockedOrder = mocked(mocked(OrderApi).mock.instances[0])

    afterEach(() => jest.clearAllMocks())
    afterAll(() => jest.resetAllMocks())

    it('should place market buy call order', async function () {
        const symbol = "PLTR"
        const expireDate = new Date(2021, 4, 14)
        const [timestamp, underlyingId, contractId] = stageOptionLookup(symbol, "C", expireDate)
        const pltrOrder = new OptionOrder(symbol, 25, expireDate, "buy", "call", "MKT")
        await ibkr.placeOptionOrders(pltrOrder)

        expect(mockedContract.iserverSecdefSearchPost).toHaveBeenCalledWith({symbol})
        expect(mockedContract.iserverSecdefInfoGet).toHaveBeenCalledWith(
            underlyingId.toString(), "OPT", "MAY21", "SMART", "25", "C"
        )
        expect(mockedOrder.iserverAccountAccountIdOrdersPost).toHaveBeenCalledWith(accountId, {
            orders: [{
                accId: accountId, conid: contractId, secType: `${contractId}:OPT`,
                cOID: `ic.pltr-${timestamp}`, orderType: "MKT", side: "BUY",
                ticker: symbol, tif: "DAY", quantity: 1, useAdaptive: true
            }]
        })
    });

    it('should place 5 market sell put orders', async function() {
        const symbol = "TSLA"
        const expireDate = new Date(2021, 1, 26)
        const [timestamp, underlyingId, contractId] = stageOptionLookup(symbol, "P", expireDate)

        const buyPut = new OptionOrder(symbol, 500, expireDate, "sell", "put", "MKT", undefined, 5)
        await ibkr.placeOptionOrders(buyPut)

        expect(mockedContract.iserverSecdefSearchPost).toHaveBeenCalledWith({symbol})
        expect(mockedContract.iserverSecdefInfoGet).toHaveBeenCalledWith(
            underlyingId.toString(), "OPT", "FEB21", "SMART", "500", "P"
        )
        expect(mockedOrder.iserverAccountAccountIdOrdersPost).toHaveBeenCalledWith(accountId, {
            orders: [{
                accId: accountId, conid: contractId, secType: `${contractId}:OPT`, cOID: `ic.tsla-${timestamp}`,
                orderType: "MKT", ticker: symbol, tif: "DAY", side: "SELL", quantity: 5, useAdaptive: true
            }]
        })
    })

    it('should place market spread order', async function () {
        const symbol = "GME"
        const expireDate = new Date(2021, 4, 21)
        const [_, underlyingId, contractId] = stageOptionLookup(symbol, "C", expireDate)
        const [timestamp, underlyingId2, contractId2] = stageOptionLookup(symbol, "P", expireDate)

        const buyCall = new OptionOrder(symbol, 172.5, expireDate, "buy", "call", "LMT", 8)
        const sellCall = new OptionOrder(symbol, 170, expireDate, "sell", "call", "LMT", 9.50)
        await ibkr.placeOptionOrders(buyCall, sellCall)

        expect(mockedContract.iserverSecdefSearchPost).toHaveBeenCalledTimes(2)
        expect(mockedContract.iserverSecdefSearchPost).toHaveBeenCalledWith({symbol})
        expect(mockedContract.iserverSecdefInfoGet).toHaveBeenNthCalledWith(
            1, underlyingId.toString(), "OPT", "MAY21", "SMART", "172.5", "C"
        )
        expect(mockedContract.iserverSecdefInfoGet).toHaveBeenNthCalledWith(
            2, underlyingId2.toString(), "OPT", "MAY21", "SMART", "170", "C"
        )
        expect(mockedOrder.iserverAccountAccountIdOrdersPost).toHaveBeenCalledWith(accountId, {
            orders: [
                {
                    accId: accountId, conid: contractId, secType: `${contractId}:OPT`,
                    cOID: `ic.${symbol.toLowerCase()}-${timestamp}`,
                    orderType: "LMT", price: 8, ticker: symbol, tif: "DAY", side: "BUY", quantity: 1,
                    useAdaptive: true
                },
                {
                    accId: accountId, conid: contractId2, secType: `${contractId2}:OPT`,
                    parentId: `ic.${symbol.toLowerCase()}-${timestamp}`,
                    orderType: "LMT", price: 9.50, ticker: symbol, tif: "DAY", side: "SELL", quantity: 1,
                    useAdaptive: true
                }
            ]
        })
    });

    it('should place iron condor order', async function () {
        const symbol = "GOOG"
        const expireDate = new Date(2021, 4, 21)
        const pbContractId = stageOptionLookup(symbol, "P", expireDate)[2]
        const psContractId = stageOptionLookup(symbol, "P", expireDate)[2]
        const csContractId = stageOptionLookup(symbol, "C", expireDate)[2]
        const [timestamp, _, cbContractId] = stageOptionLookup(symbol, "C", expireDate)

        const pbOrder = new OptionOrder(symbol, 1830, expireDate, "buy", "put", "MKT")
        const psOrder = new OptionOrder(symbol, 1840, expireDate, "sell", "put", "MKT")
        const csOrder = new OptionOrder(symbol, 2250, expireDate, "sell", "call", "MKT")
        const cbOrder = new OptionOrder(symbol, 2260, expireDate, "buy", "call", "MKT")
        await ibkr.placeOptionOrders(pbOrder, psOrder, csOrder, cbOrder)

        expect(mockedContract.iserverSecdefSearchPost).toHaveBeenCalledTimes(4)
        expect(mockedContract.iserverSecdefSearchPost).toHaveBeenCalledWith({symbol})
        expect(mockedOrder.iserverAccountAccountIdOrdersPost).toHaveBeenCalledWith(accountId, {
            orders: [{
                accId: accountId, conid: pbContractId, secType: `${pbContractId}:OPT`,
                cOID: `ic.${symbol.toLowerCase()}-${timestamp}`, orderType: "MKT", ticker: symbol,
                tif: "DAY", side: "BUY", quantity: 1, useAdaptive: true
            }, {
                accId: accountId, conid: psContractId, secType: `${psContractId}:OPT`,
                parentId: `ic.${symbol.toLowerCase()}-${timestamp}`, orderType: "MKT", ticker: symbol,
                tif: "DAY", side: "SELL", quantity: 1, useAdaptive: true
            }, {
                accId: accountId, conid: csContractId, secType: `${csContractId}:OPT`,
                parentId: `ic.${symbol.toLowerCase()}-${timestamp}`, orderType: "MKT", ticker: symbol,
                tif: "DAY", side: "SELL", quantity: 1, useAdaptive: true
            }, {
                accId: accountId, conid: cbContractId, secType: `${cbContractId}:OPT`,
                parentId: `ic.${symbol.toLowerCase()}-${timestamp}`, orderType: "MKT", ticker: symbol,
                tif: "DAY", side: "BUY", quantity: 1, useAdaptive: true
            }]
        })
    });

    it('should place put sell with correct maturity date', async function () {
        const symbol = "SOS"
        const expireDate = new Date(2021, 4, 21)
        const underlyingId = randomIntRange(100000, 999999)
        const [contractId, contractId2] = [randomIntRange(100000, 999999), randomIntRange(100000, 999999)]
        const timestamp = randomIntRange(1495349754521, 1526885754521)
        Date.now = () => timestamp
        mockResolvedOnce(mockedContract.iserverSecdefSearchPost, [{
            conid: underlyingId, symbol, description: "NASDAQ"
        }])
        mockResolvedOnce(mockedContract.iserverSecdefInfoGet, [{
            conid: contractId, symbol, right: "P", maturityDate: dateFormat(expireDate.addWeeks(-1), 'yyyymmdd')
        }, {
            conid: contractId2, symbol, right: "P", maturityDate: dateFormat(expireDate.addWeeks(1), 'yyyymmdd')
        }])

        const sellPut = new OptionOrder(symbol, 2.50, expireDate, "sell", "put", "MKT", undefined, 3)
        await ibkr.placeOptionOrders(sellPut)
        expect(mockedOrder.iserverAccountAccountIdOrdersPost).toHaveBeenCalledWith(accountId, {
            orders: [
                {
                    accId: accountId, conid: contractId2, secType: `${contractId2}:OPT`,
                    cOID: `ic.${symbol.toLowerCase()}-${timestamp}`,
                    orderType: "MKT", ticker: symbol, tif: "DAY", side: "SELL", quantity: 3,
                    useAdaptive: true
                }
            ]
        })
    });

    it('should not do anything if orders is empty', async function () {
        await ibkr.placeOptionOrders()
        expect(mockedContract.iserverSecdefSearchPost).not.toHaveBeenCalled()
        expect(mockedContract.iserverSecdefInfoGet).not.toHaveBeenCalled()
        expect(mockedOrder.iserverAccountAccountIdOrdersPost).not.toHaveBeenCalled()
    });

    describe('error tests', function () {
        it('should raise error if exchange is not found', function () {
            const symbol = "PLTR"
            const expireDate = new Date(2021, 4, 21)
            stageOptionLookup(symbol, "C", expireDate, "INVALIDEXCHANGE")
            const buyCall = new OptionOrder(symbol, 22.5, expireDate, "buy", "call", "MKT")
            return expect(ibkr.placeOptionOrders(buyCall)).rejects.toThrow("Requested symbol not found in NYSE or NASDAQ")
        });

        it('should raise error if maturity date not found', function () {
            const symbol = "ELY"
            const expireDate = new Date(2020, 2, 20)
            stageOptionLookup(symbol, "P", expireDate)
            const buyPut = new OptionOrder(symbol, 30, expireDate.addWeeks(1), "buy", "put", "LMT", 4.05)
            return expect(ibkr.placeOptionOrders(buyPut)).rejects.toThrow("Option expiration not found")
        });
    });

    function stageOptionLookup(symbol: string, right: "C" | "P",
                               expirationDate: Date = new Date(), exchange: string = "NYSE") {
        const underlyingId = randomIntRange(100000, 999999)
        const contractId = randomIntRange(100000, 999999)
        const timestamp = randomIntRange(1495349754521, 1526885754521)
        Date.now = () => timestamp
        mockResolvedOnce(mockedContract.iserverSecdefSearchPost, [{
            conid: underlyingId, symbol, description: exchange
        }])
        mockResolvedOnce(mockedContract.iserverSecdefInfoGet, [{
            conid: contractId, symbol, right, maturityDate: dateFormat(expirationDate, 'yyyymmdd')
        }])
        return [timestamp, underlyingId, contractId]
    }
});

describe('Ibkr account summary tests', function() {

    const mockedAccount = mocked(mocked(AccountApi).mock.instances[0])

    afterEach(() => jest.clearAllMocks())

    describe('cash bal tests', function() {
        it('should lookup account cash balance', async function() {
            mockedAccount.portfolioAccountIdSummaryGet.mockResolvedValue({
                body: accountSummary
            } as any)
            const bal = await ibkr.cashBal()
            expect(mockedAccount.portfolioAccountIdSummaryGet).toBeCalledWith(accountId)
            expect(bal).toBe(9995.5)
        })

        it('should return 0 if summary returns undefined', async function () {
            mockedAccount.portfolioAccountIdSummaryGet.mockResolvedValue({
                body: undefined
            } as any)
            const bal = await ibkr.cashBal()
            expect(bal).toBe(0)
        });
    })

    describe('buy power tests', function() {
        it('should lookup account buying power', async function () {
            mockedAccount.portfolioAccountIdSummaryGet.mockResolvedValue({body: accountSummary} as any)
            const buyPower = await ibkr.buyingPower()
            expect(mockedAccount.portfolioAccountIdSummaryGet).toBeCalledWith(accountId)
            expect(buyPower).toBe(39982)
        });

        it('should return 0 if summary returns undefined', async function () {
            mockedAccount.portfolioAccountIdSummaryGet.mockResolvedValue({
                body: undefined
            } as any)
            const bal = await ibkr.buyingPower()
            expect(bal).toBe(0)
        });
    })
})

