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
import { AlertResponseConditions } from './alertResponseConditions';

export class AlertResponse {
    /**
    * account id
    */
    'account'?: string;
    'order_id'?: number;
    /**
    * name of alert
    */
    'alert_name'?: string;
    /**
    * The message you want to receive via email or text message
    */
    'alert_message'?: string;
    /**
    * whether alert is active or not, so value can only be 0 or 1
    */
    'alert_active'?: number;
    /**
    * whether alert is repeatable or not, so value can only be 0 or 1
    */
    'alert_repeatable'?: number;
    /**
    * email address to receive alert
    */
    'alert_email'?: string;
    /**
    * whether allowing to send email or not, so value can only be 0 or 1, 
    */
    'alert_send_message'?: number;
    /**
    * time in force, can only be GTC or GTD
    */
    'tif'?: string;
    /**
    * format, YYYYMMDD-HH:mm:ss 
    */
    'expire_time'?: string;
    /**
    * status of alert
    */
    'order_status'?: string;
    /**
    * value can only be 0 or 1, set to 1 if the alert can be triggered outside regular trading marketHrs.
    */
    'outsideRth'?: number;
    /**
    * value can only be 0 or 1, set to 1 to enable the alert only in IBKR mobile 
    */
    'itws_orders_only'?: number;
    /**
    * value can only be 0 or 1, set to 1 to allow to show alert in pop-ups
    */
    'alert_show_popup'?: number;
    /**
    * whether the alert has been triggered
    */
    'alert_triggered'?: boolean;
    /**
    * whether the alert can be edited
    */
    'order_not_editable'?: boolean;
    /**
    * for MTA alert only, each user has a unique toolId and it will stay the same, do not send for normal alert 
    */
    'tool_id'?: number;
    /**
    * audio message to play when alert is triggered
    */
    'alert_play_audio'?: string;
    /**
    * MTA alert only
    */
    'alert_mta_currency'?: string;
    /**
    * MTA alert only
    */
    'alert_mta_defaults'?: string;
    /**
    * MTA alert only
    */
    'time_zone'?: string;
    /**
    * MTA alert only
    */
    'alert_default_type'?: string;
    /**
    * size of conditions array
    */
    'condition_size'?: number;
    /**
    * whether allowing the condition can be triggered outside of regular trading marketHrs, 1 means allow
    */
    'condition_outside_rth'?: number;
    'conditions'?: Array<AlertResponseConditions>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "account",
            "baseName": "account",
            "type": "string"
        },
        {
            "name": "order_id",
            "baseName": "order_id",
            "type": "number"
        },
        {
            "name": "alert_name",
            "baseName": "alert_name",
            "type": "string"
        },
        {
            "name": "alert_message",
            "baseName": "alert_message",
            "type": "string"
        },
        {
            "name": "alert_active",
            "baseName": "alert_active",
            "type": "number"
        },
        {
            "name": "alert_repeatable",
            "baseName": "alert_repeatable",
            "type": "number"
        },
        {
            "name": "alert_email",
            "baseName": "alert_email",
            "type": "string"
        },
        {
            "name": "alert_send_message",
            "baseName": "alert_send_message",
            "type": "number"
        },
        {
            "name": "tif",
            "baseName": "tif",
            "type": "string"
        },
        {
            "name": "expire_time",
            "baseName": "expire_time",
            "type": "string"
        },
        {
            "name": "order_status",
            "baseName": "order_status",
            "type": "string"
        },
        {
            "name": "outsideRth",
            "baseName": "outsideRth",
            "type": "number"
        },
        {
            "name": "itws_orders_only",
            "baseName": "itws_orders_only",
            "type": "number"
        },
        {
            "name": "alert_show_popup",
            "baseName": "alert_show_popup",
            "type": "number"
        },
        {
            "name": "alert_triggered",
            "baseName": "alert_triggered",
            "type": "boolean"
        },
        {
            "name": "order_not_editable",
            "baseName": "order_not_editable",
            "type": "boolean"
        },
        {
            "name": "tool_id",
            "baseName": "tool_id",
            "type": "number"
        },
        {
            "name": "alert_play_audio",
            "baseName": "alert_play_audio",
            "type": "string"
        },
        {
            "name": "alert_mta_currency",
            "baseName": "alert_mta_currency",
            "type": "string"
        },
        {
            "name": "alert_mta_defaults",
            "baseName": "alert_mta_defaults",
            "type": "string"
        },
        {
            "name": "time_zone",
            "baseName": "time_zone",
            "type": "string"
        },
        {
            "name": "alert_default_type",
            "baseName": "alert_default_type",
            "type": "string"
        },
        {
            "name": "condition_size",
            "baseName": "condition_size",
            "type": "number"
        },
        {
            "name": "condition_outside_rth",
            "baseName": "condition_outside_rth",
            "type": "number"
        },
        {
            "name": "conditions",
            "baseName": "conditions",
            "type": "Array<AlertResponseConditions>"
        }    ];

    static getAttributeTypeMap() {
        return AlertResponse.attributeTypeMap;
    }
}

