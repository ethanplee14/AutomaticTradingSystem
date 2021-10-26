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
import { AccountMaster } from './accountMaster';

/**
* account information
*/
export class Account {
    'id'?: string;
    'accountId'?: string;
    'accountVan'?: string;
    'accountTitle'?: string;
    'displayName'?: string;
    'accountAlias'?: string;
    'accountStatus'?: number;
    'currency'?: string;
    'type'?: string;
    'tradingType'?: string;
    'faclient'?: boolean;
    'parent'?: string;
    'desc'?: string;
    'covestor'?: boolean;
    'master'?: AccountMaster;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "id",
            "baseName": "id",
            "type": "string"
        },
        {
            "name": "accountId",
            "baseName": "accountId",
            "type": "string"
        },
        {
            "name": "accountVan",
            "baseName": "accountVan",
            "type": "string"
        },
        {
            "name": "accountTitle",
            "baseName": "accountTitle",
            "type": "string"
        },
        {
            "name": "displayName",
            "baseName": "displayName",
            "type": "string"
        },
        {
            "name": "accountAlias",
            "baseName": "accountAlias",
            "type": "string"
        },
        {
            "name": "accountStatus",
            "baseName": "accountStatus",
            "type": "number"
        },
        {
            "name": "currency",
            "baseName": "currency",
            "type": "string"
        },
        {
            "name": "type",
            "baseName": "type",
            "type": "string"
        },
        {
            "name": "tradingType",
            "baseName": "tradingType",
            "type": "string"
        },
        {
            "name": "faclient",
            "baseName": "faclient",
            "type": "boolean"
        },
        {
            "name": "parent",
            "baseName": "parent",
            "type": "string"
        },
        {
            "name": "desc",
            "baseName": "desc",
            "type": "string"
        },
        {
            "name": "covestor",
            "baseName": "covestor",
            "type": "boolean"
        },
        {
            "name": "master",
            "baseName": "master",
            "type": "AccountMaster"
        }    ];

    static getAttributeTypeMap() {
        return Account.attributeTypeMap;
    }
}
