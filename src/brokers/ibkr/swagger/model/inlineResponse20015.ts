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

export class InlineResponse20015 {
    /**
    * Unique account id
    */
    'accounts'?: Array<string>;
    /**
    * Account Id and its alias
    */
    'aliases'?: object;
    'selectedAccount'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "accounts",
            "baseName": "accounts",
            "type": "Array<string>"
        },
        {
            "name": "aliases",
            "baseName": "aliases",
            "type": "object"
        },
        {
            "name": "selectedAccount",
            "baseName": "selectedAccount",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return InlineResponse20015.attributeTypeMap;
    }
}

