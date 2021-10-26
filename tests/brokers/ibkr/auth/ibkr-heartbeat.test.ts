import {mocked} from 'ts-jest/utils'

import {ibkrClient, SessionApi} from "../../../../src/brokers/ibkr/swagger";
import {IbkrHeartbeat} from '../../../../src/brokers/ibkr/auth/ibkr-heartbeat'

jest.mock("../../../../src/brokers/ibkr/swagger/api/SessionApi")
describe("ibkr server heartbeat tests", function() {

    const client = ibkrClient()
    const mockedSession = mocked(SessionApi).mock.instances[0]
    let heartbeat: IbkrHeartbeat

    beforeEach(() => {
        heartbeat = new IbkrHeartbeat(client)
        mocked(mockedSession.ticklePost).mockClear()
        mocked(mockedSession.iserverReauthenticatePost).mockClear()
        mocked(mockedSession.ticklePost).mockReturnValue(Promise.resolve({
            body: {iserver: {authStatus: {authenticated: true}}}
        } as any))
        mocked(mockedSession.iserverReauthenticatePost).mockReturnValue(Promise.resolve({
            body: {}
        } as any))
    })

    it('should tickle the server', async function() {
        await heartbeat.run()
        const tickle = mocked(SessionApi).mock.instances[0].ticklePost
        expect(tickle).toBeCalled()
    });

    it('should re-authenticate if tickle authenticated returns false', async function () {
        mocked(mockedSession.ticklePost).mockReturnValue(Promise.resolve({
            body: {iserver: {authStatus: {authenticated: false}}}
        } as any))

        await heartbeat.run()
        expect(mockedSession.ticklePost).toHaveBeenCalled()
        expect(mockedSession.iserverReauthenticatePost).toHaveBeenCalled()
    });

    it('should raise error if re-authentication fails', async function() {
        mocked(mockedSession.ticklePost).mockReturnValue(Promise.resolve({
            body: {iserver: {authStatus: {authenticated: false}}}
        } as any))

        mocked(mockedSession.iserverReauthenticatePost).mockReturnValue(Promise.resolve({
            error: "not logged in"
        } as any))

        return expect(async() => await heartbeat.run()).rejects.toThrowError()
    })
})