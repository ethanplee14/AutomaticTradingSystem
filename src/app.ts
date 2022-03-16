import ibkrConfigs from '../config/ibkr.json'
import {Ibkr} from "./brokers/ibkr/Ibkr";
import {IbkrMarketData} from "./market/ibkr/ibkr-market-data";
import {StrategyEngine} from "./bot/strategy-engine";
import {Spactastic} from "./strategies/spactastic";
import {scrapeSpacUniverse} from "./strategies/spactastic/spac-lookup";
import {TDAMarketData} from "./market/tda/tda-market-data";
import {tdaClient} from "./brokers/tda";
import {TokenFile} from "./brokers/tda/auth/token-file";

require("log-timestamp");
require('datejs');


(async() => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

    const accountId = ibkrConfigs.paperTradingId

    const tokenFile = new TokenFile("./config/tda-tokens.json")
    await tokenFile.load()
    const tdaMarketData = new TDAMarketData(tdaClient(tokenFile))

    const ibkr = new Ibkr(accountId)
    // const ibkrData = new IbkrMarketData(ibkr)

    console.log(await ibkr.portfolio())
    const spactastic = new Spactastic(scrapeSpacUniverse)
    await spactastic.run(ibkr, tdaMarketData)
    // const hourlyEngine = new StrategyEngine(ibkr, ibkrData)
    // hourlyEngine.loopInterval = 1000 * 60 * 60
    // hourlyEngine.register(new Spactastic(scrapeSpacUniverse))
    // await hourlyEngine.start()
})()

