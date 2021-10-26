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

export class InlineResponse20019 {
    'request_id'?: number;
    'order_id'?: number;
    'success'?: boolean;
    'text'?: string;
    'order_status'?: string;
    'failure_list'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "request_id",
            "baseName": "request_id",
            "type": "number"
        },
        {
            "name": "order_id",
            "baseName": "order_id",
            "type": "number"
        },
        {
            "name": "success",
            "baseName": "success",
            "type": "boolean"
        },
        {
            "name": "text",
            "baseName": "text",
            "type": "string"
        },
        {
            "name": "order_status",
            "baseName": "order_status",
            "type": "string"
        },
        {
            "name": "failure_list",
            "baseName": "failure_list",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return InlineResponse20019.attributeTypeMap;
    }
}
