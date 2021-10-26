import {mocked} from 'ts-jest/utils'

import {IbkrHeartbeat} from "../../../src/brokers/ibkr/auth/ibkr-heartbeat";
import {IbkrEngine} from "../../../src/brokers/ibkr/ibkr-engine";
import {randomIntRange} from "../../../src/utils/math";

jest.mock("../../../src/brokers/ibkr/auth/ibkr-heartbeat")
jest.useFakeTimers()
describe("ibkr engine tests", function() {

    const engine = new IbkrEngine({} as any)
    const heartbeat = mocked(IbkrHeartbeat).mock.instances[0]

    beforeEach(() => {
        jest.clearAllMocks()
        jest.clearAllTimers()
    })

    it('should run heartbeat after a minute', function () {
        engine.start()
        expect(heartbeat.run).not.toHaveBeenCalled()
        jest.advanceTimersByTime(60000)
        expect(heartbeat.run).toHaveBeenCalled()
    });

    it('should run heartbeat every minute indefinitely', function () {
        engine.start()
        for(let i = 0; i < randomIntRange(10, 20); i++) {
            jest.advanceTimersByTime(60000)
            expect(heartbeat.run).toHaveBeenCalledTimes(i+1)
        }
    });
})