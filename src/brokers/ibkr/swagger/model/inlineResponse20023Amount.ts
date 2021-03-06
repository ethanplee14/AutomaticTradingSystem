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

export class InlineResponse20023Amount {
    /**
    * for example 23,000 USD
    */
    'amount'?: string;
    /**
    * for example 1.1 ... 1.2 USD
    */
    'commission'?: string;
    'total'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "amount",
            "baseName": "amount",
            "type": "string"
        },
        {
            "name": "commission",
            "baseName": "commission",
            "type": "string"
        },
        {
            "name": "total",
            "baseName": "total",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return InlineResponse20023Amount.attributeTypeMap;
    }
}

