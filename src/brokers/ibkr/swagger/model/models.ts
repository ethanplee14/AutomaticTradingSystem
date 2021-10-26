import localVarRequest from 'request';

export * from './account';
export * from './accountMaster';
export * from './alertRequest';
export * from './alertRequestConditions';
export * from './alertResponse';
export * from './alertResponseConditions';
export * from './authStatus';
export * from './calendarRequest';
export * from './calendarRequestDate';
export * from './calendarRequestFilters';
export * from './contract';
export * from './contractRules';
export * from './historyData';
export * from './historyDataData';
export * from './historyResult';
export * from './historyResultBars';
export * from './ibcustEntityInfoAddress';
export * from './ibcustEntityInfoEntities';
export * from './ibcustEntityInfoName';
export * from './inlineObject';
export * from './inlineObject1';
export * from './inlineObject10';
export * from './inlineObject11';
export * from './inlineObject12';
export * from './inlineObject2';
export * from './inlineObject3';
export * from './inlineObject4';
export * from './inlineObject5';
export * from './inlineObject6';
export * from './inlineObject7';
export * from './inlineObject8';
export * from './inlineObject9';
export * from './inlineResponse200';
export * from './inlineResponse2001';
export * from './inlineResponse20010';
export * from './inlineResponse20011';
export * from './inlineResponse20012';
export * from './inlineResponse20013';
export * from './inlineResponse20014';
export * from './inlineResponse20015';
export * from './inlineResponse20016';
export * from './inlineResponse20017';
export * from './inlineResponse20018';
export * from './inlineResponse20019';
export * from './inlineResponse2002';
export * from './inlineResponse20020';
export * from './inlineResponse20020Orders';
export * from './inlineResponse20021';
export * from './inlineResponse20022';
export * from './inlineResponse20023';
export * from './inlineResponse20023Amount';
export * from './inlineResponse20023Equity';
export * from './inlineResponse20024';
export * from './inlineResponse20025';
export * from './inlineResponse20026';
export * from './inlineResponse20027';
export * from './inlineResponse20028';
export * from './inlineResponse20029';
export * from './inlineResponse2003';
export * from './inlineResponse20030';
export * from './inlineResponse20031';
export * from './inlineResponse20031CqtTypes';
export * from './inlineResponse20031FraqTypes';
export * from './inlineResponse20031IbalgoTypes';
export * from './inlineResponse20031OrderDefaults';
export * from './inlineResponse20031OrderTypes';
export * from './inlineResponse20031OrderTypesOutside';
export * from './inlineResponse20031Rules';
export * from './inlineResponse20031String';
export * from './inlineResponse20031TifTypes';
export * from './inlineResponse20032';
export * from './inlineResponse20032FilterList';
export * from './inlineResponse20032InstrumentList';
export * from './inlineResponse20032LocationTree';
export * from './inlineResponse20032Locations';
export * from './inlineResponse20032ScanTypeList';
export * from './inlineResponse20033';
export * from './inlineResponse20034';
export * from './inlineResponse20035';
export * from './inlineResponse20035Schedules';
export * from './inlineResponse20035Sessions';
export * from './inlineResponse20035TradingTimes';
export * from './inlineResponse20036';
export * from './inlineResponse20037';
export * from './inlineResponse2004';
export * from './inlineResponse2004E';
export * from './inlineResponse2005';
export * from './inlineResponse2006';
export * from './inlineResponse2007';
export * from './inlineResponse2008';
export * from './inlineResponse2009';
export * from './inlineResponse400';
export * from './inlineResponse4001';
export * from './inlineResponse429';
export * from './iserverSecdefSearchSections';
export * from './ledger';
export * from './marketData';
export * from './modifyOrder';
export * from './order';
export * from './orderData';
export * from './orderDataWarnings';
export * from './orderRequest';
export * from './performance';
export * from './performanceCps';
export * from './performanceCpsData';
export * from './performanceNav';
export * from './performanceTpps';
export * from './positionData';
export * from './scannerParams';
export * from './scannerParamsFilter';
export * from './scannerResult';
export * from './scannerResultContracts';
export * from './scannerResultContractsContract';
export * from './secdefInfo';
export * from './setAccount';
export * from './statsData';
export * from './summary';
export * from './systemError';
export * from './trade';
export * from './transactions';
export * from './transactionsTransactions';

import * as fs from 'fs';

export interface RequestDetailedFile {
    value: Buffer;
    options?: {
        filename?: string;
        contentType?: string;
    }
}

export type RequestFile = string | Buffer | fs.ReadStream | RequestDetailedFile;


import { Account } from './account';
import { AccountMaster } from './accountMaster';
import { AlertRequest } from './alertRequest';
import { AlertRequestConditions } from './alertRequestConditions';
import { AlertResponse } from './alertResponse';
import { AlertResponseConditions } from './alertResponseConditions';
import { AuthStatus } from './authStatus';
import { CalendarRequest } from './calendarRequest';
import { CalendarRequestDate } from './calendarRequestDate';
import { CalendarRequestFilters } from './calendarRequestFilters';
import { Contract } from './contract';
import { ContractRules } from './contractRules';
import { HistoryData } from './historyData';
import { HistoryDataData } from './historyDataData';
import { HistoryResult } from './historyResult';
import { HistoryResultBars } from './historyResultBars';
import { IbcustEntityInfoAddress } from './ibcustEntityInfoAddress';
import { IbcustEntityInfoEntities } from './ibcustEntityInfoEntities';
import { IbcustEntityInfoName } from './ibcustEntityInfoName';
import { InlineObject } from './inlineObject';
import { InlineObject1 } from './inlineObject1';
import { InlineObject10 } from './inlineObject10';
import { InlineObject11 } from './inlineObject11';
import { InlineObject12 } from './inlineObject12';
import { InlineObject2 } from './inlineObject2';
import { InlineObject3 } from './inlineObject3';
import { InlineObject4 } from './inlineObject4';
import { InlineObject5 } from './inlineObject5';
import { InlineObject6 } from './inlineObject6';
import { InlineObject7 } from './inlineObject7';
import { InlineObject8 } from './inlineObject8';
import { InlineObject9 } from './inlineObject9';
import { InlineResponse200 } from './inlineResponse200';
import { InlineResponse2001 } from './inlineResponse2001';
import { InlineResponse20010 } from './inlineResponse20010';
import { InlineResponse20011 } from './inlineResponse20011';
import { InlineResponse20012 } from './inlineResponse20012';
import { InlineResponse20013 } from './inlineResponse20013';
import { InlineResponse20014 } from './inlineResponse20014';
import { InlineResponse20015 } from './inlineResponse20015';
import { InlineResponse20016 } from './inlineResponse20016';
import { InlineResponse20017 } from './inlineResponse20017';
import { InlineResponse20018 } from './inlineResponse20018';
import { InlineResponse20019 } from './inlineResponse20019';
import { InlineResponse2002 } from './inlineResponse2002';
import { InlineResponse20020 } from './inlineResponse20020';
import { InlineResponse20020Orders } from './inlineResponse20020Orders';
import { InlineResponse20021 } from './inlineResponse20021';
import { InlineResponse20022 } from './inlineResponse20022';
import { InlineResponse20023 } from './inlineResponse20023';
import { InlineResponse20023Amount } from './inlineResponse20023Amount';
import { InlineResponse20023Equity } from './inlineResponse20023Equity';
import { InlineResponse20024 } from './inlineResponse20024';
import { InlineResponse20025 } from './inlineResponse20025';
import { InlineResponse20026 } from './inlineResponse20026';
import { InlineResponse20027 } from './inlineResponse20027';
import { InlineResponse20028 } from './inlineResponse20028';
import { InlineResponse20029 } from './inlineResponse20029';
import { InlineResponse2003 } from './inlineResponse2003';
import { InlineResponse20030 } from './inlineResponse20030';
import { InlineResponse20031 } from './inlineResponse20031';
import { InlineResponse20031CqtTypes } from './inlineResponse20031CqtTypes';
import { InlineResponse20031FraqTypes } from './inlineResponse20031FraqTypes';
import { InlineResponse20031IbalgoTypes } from './inlineResponse20031IbalgoTypes';
import { InlineResponse20031OrderDefaults } from './inlineResponse20031OrderDefaults';
import { InlineResponse20031OrderTypes } from './inlineResponse20031OrderTypes';
import { InlineResponse20031OrderTypesOutside } from './inlineResponse20031OrderTypesOutside';
import { InlineResponse20031Rules } from './inlineResponse20031Rules';
import { InlineResponse20031String } from './inlineResponse20031String';
import { InlineResponse20031TifTypes } from './inlineResponse20031TifTypes';
import { InlineResponse20032 } from './inlineResponse20032';
import { InlineResponse20032FilterList } from './inlineResponse20032FilterList';
import { InlineResponse20032InstrumentList } from './inlineResponse20032InstrumentList';
import { InlineResponse20032LocationTree } from './inlineResponse20032LocationTree';
import { InlineResponse20032Locations } from './inlineResponse20032Locations';
import { InlineResponse20032ScanTypeList } from './inlineResponse20032ScanTypeList';
import { InlineResponse20033 } from './inlineResponse20033';
import { InlineResponse20034 } from './inlineResponse20034';
import { InlineResponse20035 } from './inlineResponse20035';
import { InlineResponse20035Schedules } from './inlineResponse20035Schedules';
import { InlineResponse20035Sessions } from './inlineResponse20035Sessions';
import { InlineResponse20035TradingTimes } from './inlineResponse20035TradingTimes';
import { InlineResponse20036 } from './inlineResponse20036';
import { InlineResponse20037 } from './inlineResponse20037';
import { InlineResponse2004 } from './inlineResponse2004';
import { InlineResponse2004E } from './inlineResponse2004E';
import { InlineResponse2005 } from './inlineResponse2005';
import { InlineResponse2006 } from './inlineResponse2006';
import { InlineResponse2007 } from './inlineResponse2007';
import { InlineResponse2008 } from './inlineResponse2008';
import { InlineResponse2009 } from './inlineResponse2009';
import { InlineResponse400 } from './inlineResponse400';
import { InlineResponse4001 } from './inlineResponse4001';
import { InlineResponse429 } from './inlineResponse429';
import { IserverSecdefSearchSections } from './iserverSecdefSearchSections';
import { Ledger } from './ledger';
import { MarketData } from './marketData';
import { ModifyOrder } from './modifyOrder';
import { Order } from './order';
import { OrderData } from './orderData';
import { OrderDataWarnings } from './orderDataWarnings';
import { OrderRequest } from './orderRequest';
import { Performance } from './performance';
import { PerformanceCps } from './performanceCps';
import { PerformanceCpsData } from './performanceCpsData';
import { PerformanceNav } from './performanceNav';
import { PerformanceTpps } from './performanceTpps';
import { PositionData } from './positionData';
import { ScannerParams } from './scannerParams';
import { ScannerParamsFilter } from './scannerParamsFilter';
import { ScannerResult } from './scannerResult';
import { ScannerResultContracts } from './scannerResultContracts';
import { ScannerResultContractsContract } from './scannerResultContractsContract';
import { SecdefInfo } from './secdefInfo';
import { SetAccount } from './setAccount';
import { StatsData } from './statsData';
import { Summary } from './summary';
import { SystemError } from './systemError';
import { Trade } from './trade';
import { Transactions } from './transactions';
import { TransactionsTransactions } from './transactionsTransactions';

/* tslint:disable:no-unused-variable */
let primitives = [
                    "string",
                    "boolean",
                    "double",
                    "integer",
                    "long",
                    "float",
                    "number",
                    "any"
                 ];

let enumsMap: {[index: string]: any} = {
        "InlineObject3.FreqEnum": InlineObject3.FreqEnum,
        "OrderData.OrderTypeEnum": OrderData.OrderTypeEnum,
        "OrderData.OrderStatusEnum": OrderData.OrderStatusEnum,
}

let typeMap: {[index: string]: any} = {
    "Account": Account,
    "AccountMaster": AccountMaster,
    "AlertRequest": AlertRequest,
    "AlertRequestConditions": AlertRequestConditions,
    "AlertResponse": AlertResponse,
    "AlertResponseConditions": AlertResponseConditions,
    "AuthStatus": AuthStatus,
    "CalendarRequest": CalendarRequest,
    "CalendarRequestDate": CalendarRequestDate,
    "CalendarRequestFilters": CalendarRequestFilters,
    "Contract": Contract,
    "ContractRules": ContractRules,
    "HistoryData": HistoryData,
    "HistoryDataData": HistoryDataData,
    "HistoryResult": HistoryResult,
    "HistoryResultBars": HistoryResultBars,
    "IbcustEntityInfoAddress": IbcustEntityInfoAddress,
    "IbcustEntityInfoEntities": IbcustEntityInfoEntities,
    "IbcustEntityInfoName": IbcustEntityInfoName,
    "InlineObject": InlineObject,
    "InlineObject1": InlineObject1,
    "InlineObject10": InlineObject10,
    "InlineObject11": InlineObject11,
    "InlineObject12": InlineObject12,
    "InlineObject2": InlineObject2,
    "InlineObject3": InlineObject3,
    "InlineObject4": InlineObject4,
    "InlineObject5": InlineObject5,
    "InlineObject6": InlineObject6,
    "InlineObject7": InlineObject7,
    "InlineObject8": InlineObject8,
    "InlineObject9": InlineObject9,
    "InlineResponse200": InlineResponse200,
    "InlineResponse2001": InlineResponse2001,
    "InlineResponse20010": InlineResponse20010,
    "InlineResponse20011": InlineResponse20011,
    "InlineResponse20012": InlineResponse20012,
    "InlineResponse20013": InlineResponse20013,
    "InlineResponse20014": InlineResponse20014,
    "InlineResponse20015": InlineResponse20015,
    "InlineResponse20016": InlineResponse20016,
    "InlineResponse20017": InlineResponse20017,
    "InlineResponse20018": InlineResponse20018,
    "InlineResponse20019": InlineResponse20019,
    "InlineResponse2002": InlineResponse2002,
    "InlineResponse20020": InlineResponse20020,
    "InlineResponse20020Orders": InlineResponse20020Orders,
    "InlineResponse20021": InlineResponse20021,
    "InlineResponse20022": InlineResponse20022,
    "InlineResponse20023": InlineResponse20023,
    "InlineResponse20023Amount": InlineResponse20023Amount,
    "InlineResponse20023Equity": InlineResponse20023Equity,
    "InlineResponse20024": InlineResponse20024,
    "InlineResponse20025": InlineResponse20025,
    "InlineResponse20026": InlineResponse20026,
    "InlineResponse20027": InlineResponse20027,
    "InlineResponse20028": InlineResponse20028,
    "InlineResponse20029": InlineResponse20029,
    "InlineResponse2003": InlineResponse2003,
    "InlineResponse20030": InlineResponse20030,
    "InlineResponse20031": InlineResponse20031,
    "InlineResponse20031CqtTypes": InlineResponse20031CqtTypes,
    "InlineResponse20031FraqTypes": InlineResponse20031FraqTypes,
    "InlineResponse20031IbalgoTypes": InlineResponse20031IbalgoTypes,
    "InlineResponse20031OrderDefaults": InlineResponse20031OrderDefaults,
    "InlineResponse20031OrderTypes": InlineResponse20031OrderTypes,
    "InlineResponse20031OrderTypesOutside": InlineResponse20031OrderTypesOutside,
    "InlineResponse20031Rules": InlineResponse20031Rules,
    "InlineResponse20031String": InlineResponse20031String,
    "InlineResponse20031TifTypes": InlineResponse20031TifTypes,
    "InlineResponse20032": InlineResponse20032,
    "InlineResponse20032FilterList": InlineResponse20032FilterList,
    "InlineResponse20032InstrumentList": InlineResponse20032InstrumentList,
    "InlineResponse20032LocationTree": InlineResponse20032LocationTree,
    "InlineResponse20032Locations": InlineResponse20032Locations,
    "InlineResponse20032ScanTypeList": InlineResponse20032ScanTypeList,
    "InlineResponse20033": InlineResponse20033,
    "InlineResponse20034": InlineResponse20034,
    "InlineResponse20035": InlineResponse20035,
    "InlineResponse20035Schedules": InlineResponse20035Schedules,
    "InlineResponse20035Sessions": InlineResponse20035Sessions,
    "InlineResponse20035TradingTimes": InlineResponse20035TradingTimes,
    "InlineResponse20036": InlineResponse20036,
    "InlineResponse20037": InlineResponse20037,
    "InlineResponse2004": InlineResponse2004,
    "InlineResponse2004E": InlineResponse2004E,
    "InlineResponse2005": InlineResponse2005,
    "InlineResponse2006": InlineResponse2006,
    "InlineResponse2007": InlineResponse2007,
    "InlineResponse2008": InlineResponse2008,
    "InlineResponse2009": InlineResponse2009,
    "InlineResponse400": InlineResponse400,
    "InlineResponse4001": InlineResponse4001,
    "InlineResponse429": InlineResponse429,
    "IserverSecdefSearchSections": IserverSecdefSearchSections,
    "Ledger": Ledger,
    "MarketData": MarketData,
    "ModifyOrder": ModifyOrder,
    "Order": Order,
    "OrderData": OrderData,
    "OrderDataWarnings": OrderDataWarnings,
    "OrderRequest": OrderRequest,
    "Performance": Performance,
    "PerformanceCps": PerformanceCps,
    "PerformanceCpsData": PerformanceCpsData,
    "PerformanceNav": PerformanceNav,
    "PerformanceTpps": PerformanceTpps,
    "PositionData": PositionData,
    "ScannerParams": ScannerParams,
    "ScannerParamsFilter": ScannerParamsFilter,
    "ScannerResult": ScannerResult,
    "ScannerResultContracts": ScannerResultContracts,
    "ScannerResultContractsContract": ScannerResultContractsContract,
    "SecdefInfo": SecdefInfo,
    "SetAccount": SetAccount,
    "StatsData": StatsData,
    "Summary": Summary,
    "SystemError": SystemError,
    "Trade": Trade,
    "Transactions": Transactions,
    "TransactionsTransactions": TransactionsTransactions,
}

export class ObjectSerializer {
    public static findCorrectType(data: any, expectedType: string) {
        if (data == undefined) {
            return expectedType;
        } else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
            return expectedType;
        } else if (expectedType === "Date") {
            return expectedType;
        } else {
            if (enumsMap[expectedType]) {
                return expectedType;
            }

            if (!typeMap[expectedType]) {
                return expectedType; // w/e we don't know the type
            }

            // Check the discriminator
            let discriminatorProperty = typeMap[expectedType].discriminator;
            if (discriminatorProperty == null) {
                return expectedType; // the type does not have a discriminator. use it.
            } else {
                if (data[discriminatorProperty]) {
                    var discriminatorType = data[discriminatorProperty];
                    if(typeMap[discriminatorType]){
                        return discriminatorType; // use the type given in the discriminator
                    } else {
                        return expectedType; // discriminator did not map to a type
                    }
                } else {
                    return expectedType; // discriminator was not present (or an empty string)
                }
            }
        }
    }

    public static serialize(data: any, type: string) {
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType: string = type.replace("Array<", ""); // Array<OptType> => OptType>
            subType = subType.substring(0, subType.length - 1); // OptType> => OptType
            let transformedData: any[] = [];
            for (let index in data) {
                let date = data[index];
                transformedData.push(ObjectSerializer.serialize(date, subType));
            }
            return transformedData;
        } else if (type === "Date") {
            return data.toISOString();
        } else {
            if (enumsMap[type]) {
                return data;
            }
            if (!typeMap[type]) { // in case we dont know the type
                return data;
            }

            // Get the actual type of this object
            type = this.findCorrectType(data, type);

            // get the map for the correct type.
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            let instance: {[index: string]: any} = {};
            for (let index in attributeTypes) {
                let attributeType = attributeTypes[index];
                instance[attributeType.baseName] = ObjectSerializer.serialize(data[attributeType.name], attributeType.type);
            }
            return instance;
        }
    }

    public static deserialize(data: any, type: string) {
        // polymorphism may change the actual type.
        type = ObjectSerializer.findCorrectType(data, type);
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType: string = type.replace("Array<", ""); // Array<OptType> => OptType>
            subType = subType.substring(0, subType.length - 1); // OptType> => OptType
            let transformedData: any[] = [];
            for (let index in data) {
                let date = data[index];
                transformedData.push(ObjectSerializer.deserialize(date, subType));
            }
            return transformedData;
        } else if (type === "Date") {
            return new Date(data);
        } else {
            if (enumsMap[type]) {// is Enum
                return data;
            }

            if (!typeMap[type]) { // dont know the type
                return data;
            }
            let instance = new typeMap[type]();
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            for (let index in attributeTypes) {
                let attributeType = attributeTypes[index];
                instance[attributeType.name] = ObjectSerializer.deserialize(data[attributeType.baseName], attributeType.type);
            }
            return instance;
        }
    }
}

export interface Authentication {
    /**
    * Apply authentication settings to header and query params.
    */
    applyToRequest(requestOptions: localVarRequest.Options): Promise<void> | void;
}

export class HttpBasicAuth implements Authentication {
    public username: string = '';
    public password: string = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        requestOptions.auth = {
            username: this.username, password: this.password
        }
    }
}

export class HttpBearerAuth implements Authentication {
    public accessToken: string | (() => string) = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (requestOptions && requestOptions.headers) {
            const accessToken = typeof this.accessToken === 'function'
                            ? this.accessToken()
                            : this.accessToken;
            requestOptions.headers["Authorization"] = "Bearer " + accessToken;
        }
    }
}

export class ApiKeyAuth implements Authentication {
    public apiKey: string = '';

    constructor(private location: string, private paramName: string) {
    }

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (this.location == "query") {
            (<any>requestOptions.qs)[this.paramName] = this.apiKey;
        } else if (this.location == "header" && requestOptions && requestOptions.headers) {
            requestOptions.headers[this.paramName] = this.apiKey;
        } else if (this.location == 'cookie' && requestOptions && requestOptions.headers) {
            if (requestOptions.headers['Cookie']) {
                requestOptions.headers['Cookie'] += '; ' + this.paramName + '=' + encodeURIComponent(this.apiKey);
            }
            else {
                requestOptions.headers['Cookie'] = this.paramName + '=' + encodeURIComponent(this.apiKey);
            }
        }
    }
}

export class OAuth implements Authentication {
    public accessToken: string = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (requestOptions && requestOptions.headers) {
            requestOptions.headers["Authorization"] = "Bearer " + this.accessToken;
        }
    }
}

export class VoidAuth implements Authentication {
    public username: string = '';
    public password: string = '';

    applyToRequest(_: localVarRequest.Options): void {
        // Do nothing
    }
}

export type Interceptor = (requestOptions: localVarRequest.Options) => (Promise<void> | void);
