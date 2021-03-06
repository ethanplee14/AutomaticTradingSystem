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
import { OrderData } from './orderData';

export class InlineResponse2008 {
    'orders'?: Array<OrderData>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "orders",
            "baseName": "orders",
            "type": "Array<OrderData>"
        }    ];

    static getAttributeTypeMap() {
        return InlineResponse2008.attributeTypeMap;
    }
}

