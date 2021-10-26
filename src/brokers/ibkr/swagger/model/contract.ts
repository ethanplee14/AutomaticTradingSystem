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
import { ContractRules } from './contractRules';

/**
* Contains all details of the contract, including rules you can use when placing orders
*/
export class Contract {
    /**
    * true means you can trade outside RTH(regular trading equitiesMarketHours)
    */
    'r_t_h'?: boolean;
    /**
    * same as that in request
    */
    'con_id'?: string;
    'company_name'?: string;
    'exchange'?: string;
    /**
    * for exmple FB
    */
    'local_symbol'?: string;
    /**
    * for example STK
    */
    'instrument_type'?: string;
    'currency'?: string;
    'companyName'?: string;
    'category'?: string;
    'industry'?: string;
    'rules'?: ContractRules;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "r_t_h",
            "baseName": "r_t_h",
            "type": "boolean"
        },
        {
            "name": "con_id",
            "baseName": "con_id",
            "type": "string"
        },
        {
            "name": "company_name",
            "baseName": "company_name",
            "type": "string"
        },
        {
            "name": "exchange",
            "baseName": "exchange",
            "type": "string"
        },
        {
            "name": "local_symbol",
            "baseName": "local_symbol",
            "type": "string"
        },
        {
            "name": "instrument_type",
            "baseName": "instrument_type",
            "type": "string"
        },
        {
            "name": "currency",
            "baseName": "currency",
            "type": "string"
        },
        {
            "name": "companyName",
            "baseName": "companyName",
            "type": "string"
        },
        {
            "name": "category",
            "baseName": "category",
            "type": "string"
        },
        {
            "name": "industry",
            "baseName": "industry",
            "type": "string"
        },
        {
            "name": "rules",
            "baseName": "rules",
            "type": "ContractRules"
        }    ];

    static getAttributeTypeMap() {
        return Contract.attributeTypeMap;
    }
}
