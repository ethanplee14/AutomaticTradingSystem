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

export class InlineObject11 {
    /**
    * symbol or name to be searched
    */
    'symbol': string;
    /**
    * should be true if the search is to be performed by name. false by default.
    */
    'name'?: boolean;
    /**
    * If search is done by name, only the assets provided in this field will be returned. Currently, only STK is supported.
    */
    'secType'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "symbol",
            "baseName": "symbol",
            "type": "string"
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "boolean"
        },
        {
            "name": "secType",
            "baseName": "secType",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return InlineObject11.attributeTypeMap;
    }
}

