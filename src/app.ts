import ibkrConfigs from '../config/ibkr.json'
import {StrategyEngine} from "./bot/strategy-engine";
import {tdaClient} from "./brokers/tda";
import {TokenFile} from "./brokers/tda/auth/token-file";
import {TDAMarketData} from "./market/tda/tda-market-data";
import {IronCondor} from "./strategies/iron-condor";
import {Ibkr} from "./brokers/ibkr/Ibkr";
import {bidAskSpreadsEqualOrBelow, legStrikeSpreadsEqual} from "./strategies/iron-condor/constraints/spread";
import {premiumAbove} from "./strategies/iron-condor/constraints/premium";
import {hasAvailableFunds} from "./strategies/iron-condor/constraints/bal";


(async() => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

    const tokensFile = new TokenFile("config/tda-tokens.json")
    await tokensFile.load()
    const tda = tdaClient(tokensFile)
    const tdaData = new TDAMarketData(tda)

    const accountId = ibkrConfigs.paperTradingId
    const ibkr = new Ibkr(accountId)
    const engine = new StrategyEngine(ibkr, tdaData)
    engine.loopInterval = 15000

    const ironCondor = new IronCondor()

    ironCondor.addConstraint(bidAskSpreadsEqualOrBelow.bind(undefined, 0.7))
    ironCondor.addConstraint(legStrikeSpreadsEqual)
    ironCondor.addConstraint(premiumAbove.bind(undefined, 5))
    ironCondor.addConstraint(hasAvailableFunds.bind(undefined, ibkr))

    engine.register(ironCondor)

    await engine.start()
})()

