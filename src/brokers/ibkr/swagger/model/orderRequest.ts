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

export class OrderRequest {
    /**
    * acctId is optional. It should be one of the accounts returned by /iserver/accounts. If not passed, the first one in the list is selected. 
    */
    'acctId'?: string;
    /**
    * conid is the identifier of the security you want to trade, you can find the conid with /iserver/secdef/search. 
    */
    'conid'?: number;
    /**
    * conid:type for example 265598:STK
    */
    'secType'?: string;
    /**
    * Customer Order ID. An arbitraty string that can be used to identify the order, e.g \"my-fb-order\". The value must be unique for a 24h span. Please do not set this value for child orders when placing a bracket order. 
    */
    'cOID'?: string;
    /**
    * When placing bracket orders, the child parentId must be equal to the cOId (customer order id) of the parent. 
    */
    'parentId'?: string;
    /**
    * orderType can be one of MKT (Market), LMT (Limit), STP (Stop) or STP_LIMIT (stop limit) 
    */
    'orderType'?: string;
    /**
    * listingExchange is optional. By default we use \"SMART\" routing. Possible values are available via this end point: /v1/portal/iserver/contract/{{conid}}/info, see valid_exchange: e.g: SMART,AMEX,NYSE, CBOE,ISE,CHX,ARCA,ISLAND,DRCTEDGE,BEX,BATS,EDGEA,CSFBALGO,JE FFALGO,BYX,IEX,FOXRIVER,TPLUS1,NYSENAT,PSX 
    */
    'listingExchange'?: string;
    /**
    * set to true if the order can be executed outside regular trading marketHrs.
    */
    'outsideRTH'?: boolean;
    /**
    * optional if order is MKT, for LMT, this is the limit price. For STP this is the stop price. 
    */
    'price'?: number;
    /**
    * SELL or BUY
    */
    'side'?: string;
    /**
    * 
    */
    'ticker'?: string;
    /**
    * GTC (Good Till Cancel) or DAY. DAY orders are automatically cancelled at the end of the Day or Trading marketHrs.
    */
    'tif'?: string;
    /**
    * for example QuickTrade
    */
    'referrer'?: string;
    /**
    * usually integer, for some special cases can be float numbers
    */
    'quantity'?: number;
    /**
    * double number, this is the cash quantity field which can only be used for FX conversion order. 
    */
    'fxQty'?: number;
    /**
    * If true, the system will use the Adaptive Algo to submit the order https://www.interactivebrokers.com/en/index.php?f=19091 
    */
    'useAdaptive'?: boolean;
    /**
    * set to true if the order is a FX conversion order 
    */
    'isCurrencyConversion'?: boolean;
    /**
    * Set the allocation method when placing an order using an FA account for a group Possible allocation methods are \"NetLiquidity\", \"AvailableEquity\", \"EqualQuantity\" and \"PctChange\". 
    */
    'allocationMethod'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "acctId",
            "baseName": "acctId",
            "type": "string"
        },
        {
            "name": "conid",
            "baseName": "conid",
            "type": "number"
        },
        {
            "name": "secType",
            "baseName": "secType",
            "type": "string"
        },
        {
            "name": "cOID",
            "baseName": "cOID",
            "type": "string"
        },
        {
            "name": "parentId",
            "baseName": "parentId",
            "type": "string"
        },
        {
            "name": "orderType",
            "baseName": "orderType",
            "type": "string"
        },
        {
            "name": "listingExchange",
            "baseName": "listingExchange",
            "type": "string"
        },
        {
            "name": "outsideRTH",
            "baseName": "outsideRTH",
            "type": "boolean"
        },
        {
            "name": "price",
            "baseName": "price",
            "type": "number"
        },
        {
            "name": "side",
            "baseName": "side",
            "type": "string"
        },
        {
            "name": "ticker",
            "baseName": "ticker",
            "type": "string"
        },
        {
            "name": "tif",
            "baseName": "tif",
            "type": "string"
        },
        {
            "name": "referrer",
            "baseName": "referrer",
            "type": "string"
        },
        {
            "name": "quantity",
            "baseName": "quantity",
            "type": "number"
        },
        {
            "name": "fxQty",
            "baseName": "fxQty",
            "type": "number"
        },
        {
            "name": "useAdaptive",
            "baseName": "useAdaptive",
            "type": "boolean"
        },
        {
            "name": "isCurrencyConversion",
            "baseName": "isCurrencyConversion",
            "type": "boolean"
        },
        {
            "name": "allocationMethod",
            "baseName": "allocationMethod",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return OrderRequest.attributeTypeMap;
    }
}

