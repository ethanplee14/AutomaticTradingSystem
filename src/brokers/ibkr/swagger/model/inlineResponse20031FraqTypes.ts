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

export class InlineResponse20031FraqTypes {
    /**
    * order types that support fractional trades
    */
    '_0'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "_0",
            "baseName": "0",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return InlineResponse20031FraqTypes.attributeTypeMap;
    }
}

