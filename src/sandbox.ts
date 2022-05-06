import robinhood from "robinhood";
import fetch from 'node-fetch'
import {scrapeSpacUniverse} from "./strategies/spactastic/spac-lookup";
import {Ibkr} from "./brokers/ibkr/ibkr";
import {IbkrMarketData} from "./market/ibkr/ibkr-market-data";
import ibkrConfigs from "../config/ibkr.json";
import {TokenFile} from "./brokers/tda/auth/token-file";
import {tdaClient} from "./brokers/tda";
import {TDAMarketData} from "./market/tda/tda-market-data";
import Alpaca from '@alpacahq/alpaca-trade-api'

(async () => {
    const alpaca = new Alpaca({
        keyId: 'PKHZ4NQW8WY9C58DVVHF',
        secretKey: 'qDAgSldb8oqwrWe6sTXvUMnNT1HJgsHAiJ9gVLmY',
        paper: true
    })

    const account = await alpaca.getAccount()
    console.log(account)
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
    // const accountId = ibkrConfigs.paperTradingId
    // const broker = new Ibkr(accountId)
    // const ibkrData = new IbkrMarketData(broker)
    //
    // console.log(await broker.positions())
    // const order = await placeOrder({symbol: "AFTR", quantity: 12})
    // console.log(await broker.lookupSymbol("ACRO"))
    // console.log(order)
    //
    // console.log(await ibkrData.stockQuote("MARA", "RIOT", "BYN", "RKT"))
    // spacData.forEach((spac: any) => {
    //     if (spac.commonSymbol != spac.initialCommonSymbol)
    //         console.log(`${spac.commonSymbol} differs from ${spac.initialCommonSymbol}`)
    // })

    // function placeOrder(alloc: {symbol: string, quantity: number}) {
    //     return broker.placeEquitiesOrders({
    //         symbol: alloc.symbol, timeInForce: "DAY",
    //         quantity: Math.abs(alloc.quantity),
    //         type: "MKT",
    //         side: alloc.quantity > 0 ? "BUY" : "SELL",
    //     })
    // }
})()

