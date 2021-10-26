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
import { InlineResponse20020Orders } from './inlineResponse20020Orders';

export class InlineResponse20020 {
    'orders'?: Array<InlineResponse20020Orders>;
    /**
    * If live order update is a snapshot
    */
    'snapshot'?: boolean;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "orders",
            "baseName": "orders",
            "type": "Array<InlineResponse20020Orders>"
        },
        {
            "name": "snapshot",
            "baseName": "snapshot",
            "type": "boolean"
        }    ];

    static getAttributeTypeMap() {
        return InlineResponse20020.attributeTypeMap;
    }
}
