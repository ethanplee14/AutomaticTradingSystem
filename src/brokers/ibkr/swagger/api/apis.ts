export * from './accountApi';
import { AccountApi } from './accountApi';
export * from './alertApi';
import { AlertApi } from './alertApi';
export * from './authenticationApi';
import { AuthenticationApi } from './authenticationApi';
export * from './cCPBetaApi';
import { CCPBetaApi } from './cCPBetaApi';
export * from './contractApi';
import { ContractApi } from './contractApi';
export * from './fYIApi';
import { FYIApi } from './fYIApi';
export * from './iBCustApi';
import { IBCustApi } from './iBCustApi';
export * from './marketDataApi';
import { MarketDataApi } from './marketDataApi';
export * from './orderApi';
import { OrderApi } from './orderApi';
export * from './ordersApi';
import { OrdersApi } from './ordersApi';
export * from './pnLApi';
import { PnLApi } from './pnLApi';
export * from './portfolioApi';
import { PortfolioApi } from './portfolioApi';
export * from './portfolioAnalystApi';
import { PortfolioAnalystApi } from './portfolioAnalystApi';
export * from './scannerApi';
import { ScannerApi } from './scannerApi';
export * from './sessionApi';
import { SessionApi } from './sessionApi';
export * from './streamingApi';
import { StreamingApi } from './streamingApi';
export * from './tradesApi';
import { TradesApi } from './tradesApi';
import * as http from 'http';

export class HttpError extends Error {
    constructor (public response: http.IncomingMessage, public body: any, public statusCode?: number) {
        super('HTTP request failed');
        this.name = 'HttpError';
    }
}

export { RequestFile } from '../model/models';

export const APIS = [AccountApi, AlertApi, AuthenticationApi, CCPBetaApi, ContractApi, FYIApi, IBCustApi, MarketDataApi, OrderApi, OrdersApi, PnLApi, PortfolioApi, PortfolioAnalystApi, ScannerApi, SessionApi, StreamingApi, TradesApi];
