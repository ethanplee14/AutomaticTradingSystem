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

export class InlineResponse20024 {
    'order_id'?: string;
    'local_order_id'?: string;
    'order_status'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "order_id",
            "baseName": "order_id",
            "type": "string"
        },
        {
            "name": "local_order_id",
            "baseName": "local_order_id",
            "type": "string"
        },
        {
            "name": "order_status",
            "baseName": "order_status",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return InlineResponse20024.attributeTypeMap;
    }
}

