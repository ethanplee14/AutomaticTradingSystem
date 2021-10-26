import {v4 as uuid} from "uuid";
import {mocked} from 'ts-jest/utils'

import {Orderer} from "../../../../src/brokers/ibkr/order/orderer";
import {randomIntRange} from "../../../../src/utils/math";

jest.mock('uuid', () => ({v4: jest.fn()}))
describe("tests order builder class", function() {

    let orderer: Orderer

    beforeEach(() => orderer = new Orderer())

    it('should queue market buy order', function() {
        const afgConid = 661377
        const randId = randomIntRange(1, 100).toString()
        mocked(uuid).mockReturnValue(randId)

        orderer.marketBuy(afgConid, 1)
        expect(orderer.preview()).toMatchObject([{
            conid: afgConid, orderType: "MKT",
            side: "BUY", quantity: 1, cOID: randId
        }])
    })

    it('should queue market sell order', function() {
        const conid = randomIntRange(100000, 999999)
        const randId = randomIntRange(1, 100).toString()
        mocked(uuid).mockReturnValue(randId)

        orderer.marketSell(conid, 5)
        expect(orderer.preview()).toMatchObject([{
            conid, orderType: "MKT",
            side: "SELL", quantity: 5, cOID: randId
        }])
    })

    it('should queue market limit buy', function () {
        const randomConid = randomIntRange(100000, 999999)
        const randId = randomIntRange(1, 100).toString()
        mocked(uuid).mockReturnValue(randId)

        orderer.limitBuy(randomConid, 5, 100)
        expect(orderer.preview()).toMatchObject([{
            conid: randomConid, orderType: "LMT", price: 100,
            side: "BUY", quantity: 5, cOID: randId
        }])
    });

    it('should queue market limit sell', function () {
        const randomConId = randomIntRange(100000, 999999)
        const randId = randomIntRange(1, 100).toString()
        mocked(uuid).mockReturnValue(randId)

        orderer.limitSell(randomConId, 10, 392)
        expect(orderer.preview()).toMatchObject([{
            conid: randomConId, orderType: "LMT", price: 392,
            side: "SELL", quantity: 10, cOID: randId
        }])
    });

    it('should add child order', function () {
        const randomConId = randomIntRange(100000, 999999)
        const randomConId2 = randomIntRange(100000, 999999)
        const randId = randomIntRange(1, 100).toString()
        mocked(uuid).mockReturnValueOnce(randId)

        orderer.marketSell(randomConId, 1)
        orderer.marketBuy(randomConId2, 1)
        expect(orderer.preview()).toMatchObject([{
            conid: randomConId, orderType: "MKT", side: "SELL",
            quantity: 1, cOID: randId
        }, {
            conid: randomConId2, orderType: "MKT", side: "BUY",
            quantity: 1, parentId: randId
        }])
    });

    it('should add child orders', function() {
        const randomConIds = [randomIntRange(100000, 999999), randomIntRange(100000, 999999),
            randomIntRange(100000, 999999), randomIntRange(100000, 999999)]
        const randId = randomIntRange(1, 100).toString()
        mocked(uuid).mockReturnValueOnce(randId)

        orderer.limitSell(randomConIds[0], 1, 15)
        orderer.limitBuy(randomConIds[1], 1, 8)
        orderer.limitSell(randomConIds[2], 1, 20)
        orderer.limitBuy(randomConIds[3], 1, 12)

        expect(orderer.preview()).toMatchObject([
            {
                conid: randomConIds[0], orderType: "LMT", side: "SELL",
                quantity: 1, cOID: randId, price: 15
            },
            {
                conid: randomConIds[1], orderType: "LMT", side: "BUY",
                quantity: 1, parentId: randId, price: 8
            },
            {
                conid: randomConIds[2], orderType: "LMT", side: "SELL",
                quantity: 1, parentId: randId, price: 20
            },
            {
                conid: randomConIds[3], orderType: "LMT", side: "BUY",
                quantity: 1, parentId: randId, price: 12
            }
        ])
    })

})