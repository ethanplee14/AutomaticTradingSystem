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
import { PerformanceCps } from './performanceCps';
import { PerformanceNav } from './performanceNav';
import { PerformanceTpps } from './performanceTpps';

export class Performance {
    'id'?: string;
    'cps'?: PerformanceCps;
    'tpps'?: PerformanceTpps;
    'nav'?: PerformanceNav;
    'pm'?: string;
    'included'?: Array<string>;
    'currencyType'?: string;
    'rc'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "id",
            "baseName": "id",
            "type": "string"
        },
        {
            "name": "cps",
            "baseName": "cps",
            "type": "PerformanceCps"
        },
        {
            "name": "tpps",
            "baseName": "tpps",
            "type": "PerformanceTpps"
        },
        {
            "name": "nav",
            "baseName": "nav",
            "type": "PerformanceNav"
        },
        {
            "name": "pm",
            "baseName": "pm",
            "type": "string"
        },
        {
            "name": "included",
            "baseName": "included",
            "type": "Array<string>"
        },
        {
            "name": "currencyType",
            "baseName": "currencyType",
            "type": "string"
        },
        {
            "name": "rc",
            "baseName": "rc",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return Performance.attributeTypeMap;
    }
}

