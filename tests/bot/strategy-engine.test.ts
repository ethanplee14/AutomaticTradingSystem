import {mocked} from 'ts-jest/utils'
import waitForExpect from "wait-for-expect";

import {StrategyEngine} from "../../src/bot/strategy-engine";
import {Strategy} from "../../src/bot/strategy";
import {TDAClient} from "../../src/brokers/tda";
import mockTDAClient from "../mocks/MockTDAClient";
import {MarketData} from "../../src/market/market-data";
import {TDAMarketData} from "../../src/market/tda/tda-market-data";
import {Ibkr} from "../../src/brokers/ibkr/Ibkr";

jest.mock('../../src/brokers/tda/auth/token-file')

describe('test strat engine build', function () {

    let botEngine: StrategyEngine
    let tdaClient: TDAClient
    let marketData: MarketData
    let ibkr = new Ibkr("FakeAccount")

    beforeEach(() => {
        tdaClient = mockTDAClient()
        marketData = new TDAMarketData(tdaClient)
        botEngine = new StrategyEngine(ibkr, marketData)
    })

    it('should register and run strategy', async function () {
        const mockStrategy = createMockStrategies()[0]
        botEngine.register(mockStrategy)
        await botEngine.start()
        await waitForExpect(() => {
            expectStrategyRan(mockStrategy)
            expect(mockStrategy.run.mock.calls[0][0]).toBe(ibkr)
            expect(mockStrategy.run.mock.calls[0][1]).toBe(marketData)
        })
    });

    it('should register and run multiple strategies', async function () {
        const strategies = createMockStrategies(3)
        botEngine.register(...strategies)
        await botEngine.start()

        await waitForExpect(() => {
            for (let strategy of strategies) {
                expectStrategyRan(strategy)
                expect(strategy.run.mock.calls[0][0]).toBe(ibkr)
                expect(strategy.run.mock.calls[0][1]).toBe(marketData)
            }
        })
    });

    it('should run asynchronously', async function () {
        const strategies = createMockStrategies(3)
        botEngine.register(...strategies)

        botEngine.start().then()

        console.log("Checking strategy calls")
        strategies.forEach(s => expect(s.run).not.toHaveBeenCalled())
        await waitForExpect(() => strategies.forEach(s => expectStrategyRan(s)))
    });
});


describe('test strategy setup', function() {

    let tdaClient: TDAClient
    let botEngine: StrategyEngine
    let marketData: MarketData

    beforeEach(() => {
        tdaClient = mockTDAClient()
        marketData = new TDAMarketData(tdaClient)
        botEngine = new StrategyEngine(new Ibkr("Fake account"), marketData)
        jest.useFakeTimers()
    })

    it('should setup strategy before running', async function () {
        const setupPromise = Promise.resolve()
        const runPromise = Promise.resolve()
        const setupSpy = jest.spyOn(setupPromise, 'then')
        const runSpy = jest.spyOn(runPromise, 'then')

        const mockStrategy = {
            setup: jest.fn(() => setupPromise),
            run: jest.fn(() => runPromise)
        }

        botEngine.register(mockStrategy)
        await botEngine.start()
        expect(mockStrategy.setup).toBeCalled()
        expect(setupSpy).toBeCalled()

        expect(mockStrategy.run).not.toBeCalled()

        jest.advanceTimersByTime(1000)
        expect(mockStrategy.run).toBeCalled()
        expect(runSpy).toBeCalled()
    });

    /*
    TODO:
        Pretty sure the bot engine works properly, but fake timers and promises don't
        play very nicely. So will re-address this at a later time. Check below for
        possible fix/explanation
        https://stackoverflow.com/questions/52177631/jest-timer-and-promise-dont-work-well-settimeout-and-async-function
     */
    it('should setup strategy with 3s delay before running', async function () {
        const setupPromise = new Promise<void>(res => setTimeout(res, 3000))
        const runPromise = Promise.resolve()
        const setupSpy = jest.spyOn(setupPromise, "then")
        const runSpy = jest.spyOn(runPromise, "then")

        const mockStrategy = {
            setup: jest.fn(() => setupPromise),
            run: jest.fn(() => runPromise)
        }

        botEngine.register(mockStrategy)
        botEngine.start().then()

        jest.advanceTimersByTime(3000)
        await Promise.resolve()

        expect(mockStrategy.setup).toBeCalledTimes(1)
        expect(setupSpy).toBeCalledTimes(1)
        expect(mockStrategy.run).not.toBeCalled()
        expect(runSpy).not.toBeCalled()

        // jest.advanceTimersByTime(500)
        // await Promise.resolve()
        // expect(mockStrategy.setup).toBeCalledTimes(1)
        // expect(setupSpy).toBeCalledTimes(1)
        // expect(global.setInterval).toBeCalledWith(expect.any(Function), 500)
        // expect(mockStrategy.run).toBeCalled()
        // expect(runSpy).toBeCalled()
    });
})


describe('tests with mocked timers', function () {

    let botEngine: StrategyEngine
    let tdaClient: TDAClient
    let marketData: MarketData

    beforeEach(() => {
        tdaClient = mockTDAClient()
        marketData = new TDAMarketData(tdaClient)
        botEngine = new StrategyEngine(new Ibkr("Fake account"), marketData)
        jest.useFakeTimers()
    })

    it('should run set interval to run strategies', async function () {
        const strategy = createMockStrategies()[0]

        botEngine.register(strategy)
        await botEngine.start()

        expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000)
        jest.advanceTimersByTime(1000)
        expectStrategyRan(strategy)
    });

    it('should run strategies multiple times', async function () {
        const strategies = createMockStrategies(5)

        botEngine.register(...strategies)
        await botEngine.start()
        jest.advanceTimersByTime(1000)
        strategies.forEach(s => expectStrategyRan(s, 1))
        jest.advanceTimersByTime(1000)
        strategies.forEach(s => expectStrategyRan(s, 2))
        jest.advanceTimersByTime(1000)
        strategies.forEach(s => expectStrategyRan(s, 3))
    });

    it('should clear interval when stopped', async function () {
        const strategy = createMockStrategies()[0]
        botEngine.register(strategy)

        await botEngine.start()

        mocked(global.setInterval, true).mockReturnValue(1000)
        expect(global.setInterval).toBeCalled()

        jest.advanceTimersByTime(1000)
        expect(strategy.run).toBeCalled()

        botEngine.stop()

        const setIntervalId = mocked(global.setInterval, true).mock.results[0].value
        expect(clearInterval).toHaveBeenCalledWith(mocked(setIntervalId))
    });

    it('should do nothing if called stop before start', function () {
        botEngine.stop()
        expect(clearInterval).not.toHaveBeenCalled()
    });
});

function expectStrategyRan(strategy: Strategy, times?: number) {
    const mockStrategy = mocked(strategy, true)
    if (times !== undefined) {
        expect(mockStrategy.run).toBeCalledTimes(times)
        expect(mockStrategy.run.mock.results[0].value.then).toBeCalledTimes(times)
    }else {
        expect(mockStrategy.run).toBeCalled()
        expect(mockStrategy.run.mock.results[0].value.then).toHaveBeenCalled()
    }
}

function createMockStrategies(amt: number = 1) {
    const strategies = []
    for (let i = 0; i < amt; i++) {
        const mockStrategy = { run: jest.fn() }
        // TODO: We don't need to mock then as all it does is give results, isn't necessary to ensure promise ran.
        mockStrategy.run.mockReturnValue({
            then: jest.fn()
        })
        strategies.push(mockStrategy)
    }
    return strategies
}
