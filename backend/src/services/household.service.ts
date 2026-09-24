import {randomUUID} from "node:crypto";
import {CreateHousehold} from "../validation/household.validation";
import {householdRepo} from "../repo/household.repo";
import {
    toHouseholdDtoWithInventoryDto,
    toHouseholdResponseDto, toHouseholdWithFullDetails,
    toHouseholdWithMembersDto
} from "../dto/household.dto";
import {AppError} from "../core/errors/AppError";
import {HTTP_STATUS} from "../core/http/httpStatus";
import {ERROR_CODES} from "../core/errors/errorCodes";
import {ItemInput, UpdateItemInput} from "../validation/item.vaidation";
import {ItemStatus} from "../types";
import {toItemResponseWithStatusDto} from "../dto/item.dto";
import {Prisma} from "../../generated/prisma";

const oneDayInMs = 1000 * 60 * 60 * 24;

const createHousehold = async (data: CreateHousehold, userId:string) =>{

    const name = data.name.trim();
    const inviteCode = randomUUID()

    const household = await householdRepo.createHousehold({
        name,
        inviteCode,
    }, userId)
    return toHouseholdResponseDto(
        household
    )
}


const getHouseholdById = async (householdId:string) =>{

    const household =  await householdRepo.getHouseholdById(householdId)
    if(!household){
        throw new AppError("Household Not Found",
            HTTP_STATUS.NOT_FOUND,
            ERROR_CODES.HOUSEHOLD_NOT_FOUND)
    }

    return toHouseholdResponseDto(household)
}


const getHouseholdDetailsById = async (householdId:string) =>{

    const household =  await householdRepo.getHouseholdDetailsById(householdId)
    if(!household){
        throw new AppError("Household Not Found",
            HTTP_STATUS.NOT_FOUND,
            ERROR_CODES.HOUSEHOLD_NOT_FOUND)
    }

    return toHouseholdWithFullDetails(household)
}


const getHouseholdMembers = async(householdId:string) =>{

    const result = await householdRepo.getHouseholdWithAllMembers(householdId)
    if(!result){
        throw new AppError("Household Not Found",
            HTTP_STATUS.NOT_FOUND,
            ERROR_CODES.HOUSEHOLD_NOT_FOUND)
    }

    return toHouseholdWithMembersDto(result)
}

const addMemberToHousehold = async (inviteCode:string, userId:string) =>{

    const id = userId.toString()
    const code = inviteCode.trim()


    const result = await householdRepo.addMemberToHousehold( code, id)

    if(!result){
        throw new AppError("Household Not Found",
            HTTP_STATUS.NOT_FOUND,
            ERROR_CODES.HOUSEHOLD_NOT_FOUND)
    }

    return toHouseholdWithMembersDto(result)
}

const deleteHouseholdMember = async (householdId:string, userId: string) =>{
    const id = userId.trim()

    const household = await getHouseholdMembers(householdId)

    const iSUserAlreadyExists  = household.members.find((member) => member.id === id)
    if(iSUserAlreadyExists === undefined){
        throw new AppError("Not a Member",
            HTTP_STATUS.CONFLICT,
            ERROR_CODES.USER_DOES_NOT_EXISTS)
    }

    const result = await householdRepo.deleteMemberFromHousehold(householdId, id)

    if(!result){
        throw new AppError("Household Not Found",
                HTTP_STATUS.NOT_FOUND,
                ERROR_CODES.HOUSEHOLD_NOT_FOUND)
    }


    return toHouseholdResponseDto(result)
}


const addItemToHousehold = async (householdId:string, itemInput:ItemInput) => {

    itemInput.name = itemInput.name.trim().toLowerCase()
    itemInput.expiry = new Date(itemInput.expiry)

    const result = await householdRepo.addItemToHousehold(itemInput, householdId)

    return toHouseholdDtoWithInventoryDto(result)
}

const deleteItemFromHousehold = async (householdId:string, itemId:string) =>{
    const result = await householdRepo.deleteItemFromHousehold(householdId, itemId)

    if(!result){
        throw new AppError("Household Not Found",
            HTTP_STATUS.NOT_FOUND,
            ERROR_CODES.HOUSEHOLD_NOT_FOUND)
    }

    return toHouseholdDtoWithInventoryDto(result)
}

const getItemStatus = async(householdId:string, itemId:string) =>{

    const result = await householdRepo.getItemByIdFromHousehold(householdId, itemId)
    if(!result){
        throw new AppError("Household Not Found",
            HTTP_STATUS.NOT_FOUND,
            ERROR_CODES.HOUSEHOLD_NOT_FOUND)
    }
    const item = result.inventory.find(item => item.id === itemId)
    if(!item){
        throw new AppError("Item not found",
            HTTP_STATUS.NOT_FOUND,
            ERROR_CODES.ITEM_NOT_FOUND)
    }
    const expiry = item.expiry
    const current = Date.now()
    // @ts-ignore
    const diffInDays = (expiry - current) / oneDayInMs
    let status: ItemStatus = "fresh"

    if(diffInDays <= 0){
        status = "Expired"
    }else if(diffInDays <= 10){
        status = "Expired"
    }

    return toItemResponseWithStatusDto(item, status)
}

const updateItem = async (householdId:string, itemId:string, input: Prisma.itemUpdateInput) =>{

    const result  = await householdRepo.updateItemInHousehold(householdId, itemId, input)

    if(!result){
        throw new AppError("Household Not Found",
            HTTP_STATUS.NOT_FOUND,
            ERROR_CODES.HOUSEHOLD_NOT_FOUND)
    }
    return toHouseholdDtoWithInventoryDto(result)
}

export const householdService = {
    createHousehold,
    getHouseholdById,
    getHouseholdDetailsById,
    getHouseholdMembers,
    addMemberToHousehold,
    deleteHouseholdMember,
    addItemToHousehold,
    deleteItemFromHousehold,
    getItemStatus,
    updateItem,
}