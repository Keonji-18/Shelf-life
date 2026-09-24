import {item as Item} from "../../generated/prisma";
import {ItemStatus} from "../types";


export interface  ItemResponseDto {
    id: string
    name: string,
    barcode: string,
    expiry: Date
    householdId: string[]
    createdAt: Date
    updatedAt: Date
}

export interface ItemResponseWithStatusDto extends ItemResponseDto {
    status: string
}

export function toItemResponseDto(item: Item):ItemResponseDto{

    return {
        id: item.id,
        name : item.name,
        barcode: item.barcode,
        expiry : item.expiry,
        householdId: item.householdId,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
    }
}

export function toItemResponseWithStatusDto(item:Item, status: ItemStatus){

    return {
        status : status,
        id: item.id,
        name : item.name,
        barcode: item.barcode,
        expiry : item.expiry,
        householdId: item.householdId,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
    }
}