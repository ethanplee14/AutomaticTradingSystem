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

export class HistoryDataData {
    /**
    * open price
    */
    'o'?: number;
    /**
    * close price
    */
    'c'?: number;
    /**
    * high price
    */
    'h'?: number;
    /**
    * low price
    */
    'l'?: number;
    /**
    * volume
    */
    'v'?: number;
    /**
    * unix time stamp
    */
    't'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "o",
            "baseName": "o",
            "type": "number"
        },
        {
            "name": "c",
            "baseName": "c",
            "type": "number"
        },
        {
            "name": "h",
            "baseName": "h",
            "type": "number"
        },
        {
            "name": "l",
            "baseName": "l",
            "type": "number"
        },
        {
            "name": "v",
            "baseName": "v",
            "type": "number"
        },
        {
            "name": "t",
            "baseName": "t",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return HistoryDataData.attributeTypeMap;
    }
}

