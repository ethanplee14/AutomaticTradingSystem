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
import { InlineResponse20023Amount } from './inlineResponse20023Amount';
import { InlineResponse20023Equity } from './inlineResponse20023Equity';

export class InlineResponse20023 {
    'amount'?: InlineResponse20023Amount;
    'equity'?: InlineResponse20023Equity;
    'initial'?: InlineResponse20023Equity;
    'maintenance'?: InlineResponse20023Equity;
    'warn'?: string;
    'error'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "amount",
            "baseName": "amount",
            "type": "InlineResponse20023Amount"
        },
        {
            "name": "equity",
            "baseName": "equity",
            "type": "InlineResponse20023Equity"
        },
        {
            "name": "initial",
            "baseName": "initial",
            "type": "InlineResponse20023Equity"
        },
        {
            "name": "maintenance",
            "baseName": "maintenance",
            "type": "InlineResponse20023Equity"
        },
        {
            "name": "warn",
            "baseName": "warn",
            "type": "string"
        },
        {
            "name": "error",
            "baseName": "error",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return InlineResponse20023.attributeTypeMap;
    }
}

