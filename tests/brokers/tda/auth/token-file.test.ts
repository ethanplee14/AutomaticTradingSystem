import {TokenFile} from '../../../../src/brokers/tda/auth/token-file'
import {randomStr} from "../../../test-utils/rand";
import {emptyTokens, Tokens} from "../../../../src/brokers/tda/auth/token-cache";

describe("tests token file operations", function() {

    const FILE_PATH = 'tests/fixtures/tokens/default-tokens.json'
    let tokenFile: TokenFile
    let tokens: Tokens

    beforeEach(async () => {
        tokenFile = new TokenFile(FILE_PATH)
        tokens = await tokenFile.load()
    })

    it('should loadWinRates token file', async function () {
        expect(tokens).toMatchObject({
            "code": "defaultcode",
            "access": "defaultaccess",
            "refresh": "defaultrefresh",
            "clientId": "defaultclient"
        })
    });

    it('should loadWinRates tokens copy', async function () {
        tokens["code"] = "changedcode"
        tokens["access"] = "changedaccess"
        tokens["refresh"] = "changedrefresh"
        tokens["clientId"] = "changedclient"

        expect(tokenFile.getTokens()).toMatchObject({
            "code": "defaultcode",
            "access": "defaultaccess",
            "refresh": "defaultrefresh",
            "clientId": "defaultclient"
        })
    });

    it('should update token value', function () {
        tokenFile.update("code", "newcode")
        expect(tokenFile.getTokens()).toMatchObject({
            "code": "newcode",
            "access": "defaultaccess",
            "refresh": "defaultrefresh",
            "clientId": "defaultclient"
        })

        tokenFile.update("access", "newaccess")
        tokenFile.update("refresh", "newrefresh")
        tokenFile.update("clientId", "newclient")
        expect(tokenFile.getTokens()).toMatchObject({
            "code": "newcode",
            "access": "newaccess",
            "refresh": "newrefresh",
            "clientId": "newclient"
        })
    });

    it('should save token values', async function() {
        const tempTokenFile = new TokenFile("./tests/fixtures/tokens/temp-tokens.json")
        const keys = ["code", "access", "refresh", "clientId"]
        const loaded = await tempTokenFile.load()

        for (let key of keys) {
            const typedKey = key as ("code" | "access" | "refresh" | "clientId")
            const newVal = randomStr(10)
            loaded[typedKey] = newVal
            tempTokenFile.update(typedKey, newVal)
        }

        await tempTokenFile.save()

        const newLoaded = await tempTokenFile.load()
        expect(loaded).toMatchObject(newLoaded)
    })
})

describe('tests token file for issues', function() {

    it('should throw file not found error', function () {
        return expect(async () => {
            const notFoundFile = new TokenFile("./no/file/here")
            await notFoundFile.load()
        }).rejects.toThrow("ENOENT")
    });

    it('should loadWinRates default values if keys are missing', async function () {
        const emptyFile = new TokenFile('./tests/fixtures/tokens/empty-tokens.json')
        const loaded = await emptyFile.load()

        expect(loaded).toMatchObject(emptyTokens())

        const newVal = randomStr(10)
        const updated = emptyFile.update("code", newVal)
        let expectedUpdated = emptyTokens()
        expectedUpdated["code"] = newVal
        expect(updated).toMatchObject(expectedUpdated)
    });

    it('should loadWinRates default if file only has partial values', async function () {
        const partialFile = new TokenFile('./tests/fixtures/tokens/partial-tokens.json')
        const loaded = await partialFile.load()

        expect(loaded).toMatchObject({
            "code": "",
            "access": "",
            "refresh": "",
            "clientId": "defaultclient"
        })

        const newCode = randomStr(10)
        const updatedCode = partialFile.update("code", newCode)
        expect(updatedCode).toMatchObject({
            "code": newCode,
            "access": "",
            "refresh": "",
            "clientId": "defaultclient"
        })

    })
})