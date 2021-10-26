// This is the entrypoint for the package
import {AccountApi} from "./api/accountApi";
import {AlertApi} from "./api/alertApi";
import {AuthenticationApi} from "./api/authenticationApi";
import {CCPBetaApi} from "./api/cCPBetaApi";
import {ContractApi} from "./api/contractApi";
import {FYIApi} from "./api/fYIApi";
import {IBCustApi} from "./api/iBCustApi";
import {MarketDataApi} from "./api/marketDataApi";
import {OrderApi} from "./api/orderApi";
import {OrdersApi} from "./api/ordersApi";
import {PnLApi} from "./api/pnLApi";
import {PortfolioApi} from "./api/portfolioApi";
import {PortfolioAnalystApi} from "./api/portfolioAnalystApi";
import {ScannerApi} from "./api/scannerApi";
import {SessionApi} from "./api/sessionApi";
import {StreamingApi} from "./api/streamingApi";
import {TradesApi} from "./api/tradesApi";

export * from './api/apis';
export * from './model/models';

export interface IbkrClient {
    account: AccountApi,
    alert: AlertApi,
    authentication: AuthenticationApi,
    ccp: CCPBetaApi,
    contract: ContractApi,
    fyi: FYIApi,
    ibcust: IBCustApi,
    market: MarketDataApi,
    order: OrderApi,
    orders: OrdersApi,
    pnl: PnLApi,
    portfolio: PortfolioApi,
    portfolioAnalyst: PortfolioAnalystApi
    scanner: ScannerApi,
    session: SessionApi,
    streaming: StreamingApi,
    trades: TradesApi
}

export function ibkrClient(): IbkrClient {
    const client = {
        account: new AccountApi(),
        alert: new AlertApi(),
        authentication: new AuthenticationApi(),
        ccp: new CCPBetaApi(),
        contract: new ContractApi(),
        fyi: new FYIApi(),
        ibcust: new IBCustApi(),
        market: new MarketDataApi(),
        order: new OrderApi(),
        orders: new OrdersApi(),
        pnl: new PnLApi(),
        portfolio: new PortfolioApi(),
        portfolioAnalyst: new PortfolioAnalystApi(),
        scanner: new ScannerApi(),
        session: new SessionApi(),
        streaming: new StreamingApi(),
        trades: new TradesApi()
    }
    Object.values(client).forEach(api => api.defaultHeaders = {"User-Agent": "BotEngine"})
    return client
}