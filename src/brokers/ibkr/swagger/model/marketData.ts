/**
 * Client Portal Web API
 * Production version of the Client Portal Web API
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { RequestFile } from './models';

export class MarketData {
    /**
    * IBKR Contract ID
    */
    'Conid'?: number;
    /**
    * Exchange
    */
    'Exchange'?: string;
    'minTick'?: number;
    'Last'?: number;
    'LastSize'?: number;
    'Bid'?: number;
    'BidSize'?: number;
    'Ask'?: number;
    'AskSize'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "Conid",
            "baseName": "Conid",
            "type": "number"
        },
        {
            "name": "Exchange",
            "baseName": "Exchange",
            "type": "string"
        },
        {
            "name": "minTick",
            "baseName": "minTick",
            "type": "number"
        },
        {
            "name": "Last",
            "baseName": "Last",
            "type": "number"
        },
        {
            "name": "LastSize",
            "baseName": "LastSize",
            "type": "number"
        },
        {
            "name": "Bid",
            "baseName": "Bid",
            "type": "number"
        },
        {
            "name": "BidSize",
            "baseName": "BidSize",
            "type": "number"
        },
        {
            "name": "Ask",
            "baseName": "Ask",
            "type": "number"
        },
        {
            "name": "AskSize",
            "baseName": "AskSize",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return MarketData.attributeTypeMap;
    }
}

