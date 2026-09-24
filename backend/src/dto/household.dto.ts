import {household as Household} from "../../generated/prisma";
import {toUserResponseDto, UserResponseDto} from "./user.dto";
import {FullHousehold, HouseholdWithInventory, HouseholdWithMembers} from "../repo/household.repo";
import {AppError} from "../core/errors/AppError";
import {HTTP_STATUS} from "../core/http/httpStatus";
import {ERROR_CODES} from "../core/errors/errorCodes";
import {ItemResponseDto, toItemResponseDto} from "./item.dto";


export interface HouseholdDto{

    id: string;
    name: string,
    userId? : string,
    inviteCode: string,
    items? : string[]
    createdAt: Date
    updatedAt: Date
}

export interface HouseholdWithMembersDto extends HouseholdDto{
    members: UserResponseDto[]
}

export interface HouseholdWithItemsDto extends HouseholdDto{
    inventory: ItemResponseDto[]
}

export function toHouseholdResponseDto(details: Household): HouseholdDto{

    if(details.itemId.length === 0){
        return {
            id: details.id,
            name:details.name,
            inviteCode: details.inviteCode,
            createdAt: details.createdAt,
            updatedAt: details.updatedAt,
        }
    }

    return{
        id: details.id,
        name:details.name,
        inviteCode: details.inviteCode,
        items: details.itemId,
        createdAt: details.createdAt,
        updatedAt: details.updatedAt,
    }
}


export function toHouseholdWithMembersDto( details:HouseholdWithMembers ): HouseholdWithMembersDto{

    if(!details){
        throw new AppError("Household not found",
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.HOUSEHOLD_NOT_FOUND)
    }

    const {members, ...detail} = details;
    return{
            ...detail,
            members: members.map(member => toUserResponseDto(member))
    }

}

export function toHouseholdDtoWithInventoryDto(details: HouseholdWithInventory): HouseholdWithItemsDto{
    if(!details){
        throw new AppError("Household not found",
            HTTP_STATUS.NOT_FOUND,
            ERROR_CODES.HOUSEHOLD_NOT_FOUND)
    }

    const {inventory, ...detail} = details
    return{
        ...detail,
        inventory: inventory.map(item => toItemResponseDto(item))
    }
}

export function toHouseholdWithFullDetails(details: FullHousehold){
    if(!details){
        throw new AppError("Household not found",
            HTTP_STATUS.NOT_FOUND,
            ERROR_CODES.HOUSEHOLD_NOT_FOUND)
    }
    const {inventory, members, ...detail} = details
    return{
        ...detail,
        members: members.map(member => toUserResponseDto(member)),
        inventory: inventory.map(item => toItemResponseDto(item))
    }
}