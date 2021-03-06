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

export class CalendarRequestDate {
    /**
    * start date of a period. for example 20180808-0400
    */
    'start'?: string;
    /**
    * end date of a period. for example 20180808-0400
    */
    'end'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "start",
            "baseName": "start",
            "type": "string"
        },
        {
            "name": "end",
            "baseName": "end",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return CalendarRequestDate.attributeTypeMap;
    }
}

