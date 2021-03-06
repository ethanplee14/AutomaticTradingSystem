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
import { PerformanceCpsData } from './performanceCpsData';

/**
* Time period performance data
*/
export class PerformanceTpps {
    /**
    * array of dates, the length should be same as the length of returns inside data.
    */
    'dates'?: Array<string>;
    /**
    * M means Month
    */
    'freq'?: string;
    'data'?: Array<PerformanceCpsData>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "dates",
            "baseName": "dates",
            "type": "Array<string>"
        },
        {
            "name": "freq",
            "baseName": "freq",
            "type": "string"
        },
        {
            "name": "data",
            "baseName": "data",
            "type": "Array<PerformanceCpsData>"
        }    ];

    static getAttributeTypeMap() {
        return PerformanceTpps.attributeTypeMap;
    }
}

