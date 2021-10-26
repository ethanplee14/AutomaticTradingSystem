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

export class AlertResponseConditions {
    /**
    * Types: 1-Price, 3-Time, 4-Margin, 5-Trade, 6-Volume, 7: MTA market 8: MTA Position, 9: MTA Acc. Daily PN& 
    */
    'condition_type'?: number;
    /**
    * format, conid@exchange
    */
    'conidex'?: string;
    'contract_description_1'?: string;
    /**
    * optional, operator for the current condition, can be >= or <=
    */
    'condition_operator'?: string;
    /**
    * optional, only some type of conditions have triggerMethod
    */
    'condition_trigger_method'?: string;
    /**
    * can not be empty, can pass default value \"*\"
    */
    'condition_value'?: string;
    /**
    * \"a\" means \"AND\", \"o\" means \"OR\", \"n\" means \"END\", the last one condition in the condition array should \"n\" 
    */
    'condition_logic_bind'?: string;
    /**
    * only needed for some MTA alert condition
    */
    'condition_time_zone'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "condition_type",
            "baseName": "condition_type",
            "type": "number"
        },
        {
            "name": "conidex",
            "baseName": "conidex",
            "type": "string"
        },
        {
            "name": "contract_description_1",
            "baseName": "contract_description_1",
            "type": "string"
        },
        {
            "name": "condition_operator",
            "baseName": "condition_operator",
            "type": "string"
        },
        {
            "name": "condition_trigger_method",
            "baseName": "condition_trigger_method",
            "type": "string"
        },
        {
            "name": "condition_value",
            "baseName": "condition_value",
            "type": "string"
        },
        {
            "name": "condition_logic_bind",
            "baseName": "condition_logic_bind",
            "type": "string"
        },
        {
            "name": "condition_time_zone",
            "baseName": "condition_time_zone",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return AlertResponseConditions.attributeTypeMap;
    }
}
