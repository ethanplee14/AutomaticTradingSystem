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

export class InlineResponse20014 {
    'ACCTID'?: Array<object>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "ACCTID",
            "baseName": "ACCTID",
            "type": "Array<object>"
        }    ];

    static getAttributeTypeMap() {
        return InlineResponse20014.attributeTypeMap;
    }
}

