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

export class InlineResponse20026 {
    'server_id'?: string;
    'conid'?: number;
    '_updated'?: number;
    /**
    * Last Price
    */
    '_31'?: string;
    /**
    * Symbol
    */
    '_55'?: string;
    /**
    * Text
    */
    '_58'?: string;
    /**
    * High
    */
    '_70'?: string;
    /**
    * Low
    */
    '_71'?: string;
    /**
    * Position
    */
    '_72'?: string;
    /**
    * Market Value
    */
    '_73'?: string;
    /**
    * Average Price
    */
    '_74'?: string;
    /**
    * Unrealized PnL
    */
    '_75'?: string;
    /**
    * Formatted position
    */
    '_76'?: string;
    /**
    * Formatted Unrealized PnL
    */
    '_77'?: string;
    /**
    * Daily PnL
    */
    '_78'?: string;
    /**
    * Change Price
    */
    '_82'?: string;
    /**
    * Change Percent
    */
    '_83'?: string;
    /**
    * Bid Price
    */
    '_84'?: string;
    /**
    * Ask Size
    */
    '_85'?: string;
    /**
    * Ask Price
    */
    '_86'?: string;
    /**
    * Volume
    */
    '_87'?: string;
    /**
    * Bid Size
    */
    '_88'?: string;
    /**
    * Exchange
    */
    '_6004'?: string;
    /**
    * Conid
    */
    '_6008'?: string;
    /**
    * Security OptType
    */
    '_6070'?: string;
    /**
    * Months
    */
    '_6072'?: string;
    /**
    * Regular Expiry
    */
    '_6073'?: string;
    /**
    * Marker for market data delivery method (similar to request id)
    */
    '_6119'?: string;
    /**
    * Underlying Conid. Use /trsrv/secdef to get more information about the security
    */
    '_6457'?: string;
    /**
    * Market Data Availability. The field may contain two chars. The first char is the primary code: R = Realtime, D = Delayed, Z = Frozen, Y = Frozen Delayed. The second char is the secondary code: P = Snapshot Available, p = Consolidated. 
    */
    '_6509'?: string;
    /**
    * Company name
    */
    '_7051'?: string;
    /**
    * Last Size
    */
    '_7059'?: string;
    /**
    * Conid + Exchange
    */
    '_7094'?: string;
    /**
    * Contract Description
    */
    '_7219'?: string;
    /**
    * Contract Description
    */
    '_7220'?: string;
    /**
    * Listing Exchange
    */
    '_7221'?: string;
    /**
    * Industry
    */
    '_7280'?: string;
    /**
    * Category
    */
    '_7281'?: string;
    /**
    * Average Daily Volume
    */
    '_7282'?: string;
    /**
    * Implied volatility of the option
    */
    '_7633'?: string;
    /**
    * Historic Volume (30d)
    */
    '_7284'?: string;
    /**
    * Put/Call Ratio
    */
    '_7285'?: string;
    /**
    * Dividend Amount
    */
    '_7286'?: string;
    /**
    * Dividend Yield %
    */
    '_7287'?: string;
    /**
    * Ex-date of the dividend
    */
    '_7288'?: string;
    /**
    * Market Cap
    */
    '_7289'?: string;
    /**
    * P/E
    */
    '_7290'?: string;
    /**
    * EPS
    */
    '_7291'?: string;
    /**
    * Cost Basis
    */
    '_7292'?: string;
    /**
    * 52 Week High
    */
    '_7293'?: string;
    /**
    * 52 Week Low
    */
    '_7294'?: string;
    /**
    * Open Price
    */
    '_7295'?: string;
    /**
    * Close Price
    */
    '_7296'?: string;
    /**
    * Delta
    */
    '_7308'?: string;
    /**
    * Gamma
    */
    '_7309'?: string;
    /**
    * Theta
    */
    '_7310'?: string;
    /**
    * Vega
    */
    '_7311'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "server_id",
            "baseName": "server_id",
            "type": "string"
        },
        {
            "name": "conid",
            "baseName": "conid",
            "type": "number"
        },
        {
            "name": "_updated",
            "baseName": "_updated",
            "type": "number"
        },
        {
            "name": "_31",
            "baseName": "31",
            "type": "string"
        },
        {
            "name": "_55",
            "baseName": "55",
            "type": "string"
        },
        {
            "name": "_58",
            "baseName": "58",
            "type": "string"
        },
        {
            "name": "_70",
            "baseName": "70",
            "type": "string"
        },
        {
            "name": "_71",
            "baseName": "71",
            "type": "string"
        },
        {
            "name": "_72",
            "baseName": "72",
            "type": "string"
        },
        {
            "name": "_73",
            "baseName": "73",
            "type": "string"
        },
        {
            "name": "_74",
            "baseName": "74",
            "type": "string"
        },
        {
            "name": "_75",
            "baseName": "75",
            "type": "string"
        },
        {
            "name": "_76",
            "baseName": "76",
            "type": "string"
        },
        {
            "name": "_77",
            "baseName": "77",
            "type": "string"
        },
        {
            "name": "_78",
            "baseName": "78",
            "type": "string"
        },
        {
            "name": "_82",
            "baseName": "82",
            "type": "string"
        },
        {
            "name": "_83",
            "baseName": "83",
            "type": "string"
        },
        {
            "name": "_84",
            "baseName": "84",
            "type": "string"
        },
        {
            "name": "_85",
            "baseName": "85",
            "type": "string"
        },
        {
            "name": "_86",
            "baseName": "86",
            "type": "string"
        },
        {
            "name": "_87",
            "baseName": "87",
            "type": "string"
        },
        {
            "name": "_88",
            "baseName": "88",
            "type": "string"
        },
        {
            "name": "_6004",
            "baseName": "6004",
            "type": "string"
        },
        {
            "name": "_6008",
            "baseName": "6008",
            "type": "string"
        },
        {
            "name": "_6070",
            "baseName": "6070",
            "type": "string"
        },
        {
            "name": "_6072",
            "baseName": "6072",
            "type": "string"
        },
        {
            "name": "_6073",
            "baseName": "6073",
            "type": "string"
        },
        {
            "name": "_6119",
            "baseName": "6119",
            "type": "string"
        },
        {
            "name": "_6457",
            "baseName": "6457",
            "type": "string"
        },
        {
            "name": "_6509",
            "baseName": "6509",
            "type": "string"
        },
        {
            "name": "_7051",
            "baseName": "7051",
            "type": "string"
        },
        {
            "name": "_7059",
            "baseName": "7059",
            "type": "string"
        },
        {
            "name": "_7094",
            "baseName": "7094",
            "type": "string"
        },
        {
            "name": "_7219",
            "baseName": "7219",
            "type": "string"
        },
        {
            "name": "_7220",
            "baseName": "7220",
            "type": "string"
        },
        {
            "name": "_7221",
            "baseName": "7221",
            "type": "string"
        },
        {
            "name": "_7280",
            "baseName": "7280",
            "type": "string"
        },
        {
            "name": "_7281",
            "baseName": "7281",
            "type": "string"
        },
        {
            "name": "_7282",
            "baseName": "7282",
            "type": "string"
        },
        {
            "name": "_7633",
            "baseName": "7633",
            "type": "string"
        },
        {
            "name": "_7284",
            "baseName": "7284",
            "type": "string"
        },
        {
            "name": "_7285",
            "baseName": "7285",
            "type": "string"
        },
        {
            "name": "_7286",
            "baseName": "7286",
            "type": "string"
        },
        {
            "name": "_7287",
            "baseName": "7287",
            "type": "string"
        },
        {
            "name": "_7288",
            "baseName": "7288",
            "type": "string"
        },
        {
            "name": "_7289",
            "baseName": "7289",
            "type": "string"
        },
        {
            "name": "_7290",
            "baseName": "7290",
            "type": "string"
        },
        {
            "name": "_7291",
            "baseName": "7291",
            "type": "string"
        },
        {
            "name": "_7292",
            "baseName": "7292",
            "type": "string"
        },
        {
            "name": "_7293",
            "baseName": "7293",
            "type": "string"
        },
        {
            "name": "_7294",
            "baseName": "7294",
            "type": "string"
        },
        {
            "name": "_7295",
            "baseName": "7295",
            "type": "string"
        },
        {
            "name": "_7296",
            "baseName": "7296",
            "type": "string"
        },
        {
            "name": "_7308",
            "baseName": "7308",
            "type": "string"
        },
        {
            "name": "_7309",
            "baseName": "7309",
            "type": "string"
        },
        {
            "name": "_7310",
            "baseName": "7310",
            "type": "string"
        },
        {
            "name": "_7311",
            "baseName": "7311",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return InlineResponse20026.attributeTypeMap;
    }
}

