import {toHouseholdDtoWithInventoryDto} from "../dto/household.dto";
import {ItemInput} from "../validation/item.vaidation";
import {itemRepo} from "../repo/item.repo";
import {ERROR_CODES} from "../core/errors/errorCodes";
import {AppError} from "../core/errors/AppError";
import {HTTP_STATUS} from "../core/http/httpStatus";
import {ItemStatus} from "../types";
import {ItemResponseDto, toItemResponseDto, toItemResponseWithStatusDto} from "../dto/item.dto";
import {Prisma} from  "../../generated/prisma"



const getItemsFromHousehold = async (householdId: string, whereClause: Prisma.itemWhereInput, orderByClause:Prisma.itemOrderByWithRelationInput)=> {

    const result = await itemRepo.getItemsFromHousehold(householdId, whereClause, orderByClause);

    if(!result){
        throw new AppError("Household not found",
            HTTP_STATUS.NOT_FOUND,
            ERROR_CODES.HOUSEHOLD_NOT_FOUND)
    }

    return result.inventory.map((item: ItemResponseDto) => toItemResponseDto(item))
}

const getItemById = async (householdId:string, itemId:string) => {

    const result = await itemRepo.getItemByIdFromHousehold(householdId, itemId)

    if (!result) {
        throw new AppError("Household Not Found",
            HTTP_STATUS.NOT_FOUND,
            ERROR_CODES.HOUSEHOLD_NOT_FOUND)
    }

    const item = result.inventory.find(item => item.id === itemId)
    if (!item) {
        throw new AppError("Item not found",
            HTTP_STATUS.NOT_FOUND,
            ERROR_CODES.ITEM_NOT_FOUND)
    }

    return toItemResponseDto(item)

}


const addItemToHousehold = async (householdId: string, itemInput: ItemInput) => {

    itemInput.name = itemInput.name.trim().toLowerCase()
    itemInput.expiry = new Date(itemInput.expiry)

    const result = await itemRepo.addItemToHousehold(itemInput, householdId)

    return toHouseholdDtoWithInventoryDto(result)
}

const deleteItemFromHousehold = async (householdId: string, itemId: string) => {
    const result = await itemRepo.deleteItemFromHousehold(householdId, itemId)

    if (!result) {
        throw new AppError("Household Not Found",
            HTTP_STATUS.NOT_FOUND,
            ERROR_CODES.HOUSEHOLD_NOT_FOUND)
    }

    return toHouseholdDtoWithInventoryDto(result)
}

const getItemStatus = async (householdId: string, itemId: string) => {

    const result = await itemRepo.getItemByIdFromHousehold(householdId, itemId)
    if (!result) {
        throw new AppError("Household Not Found",
            HTTP_STATUS.NOT_FOUND,
            ERROR_CODES.HOUSEHOLD_NOT_FOUND)
    }

    const item = result.inventory.find(item => item.id === itemId)
    if (!item) {
        throw new AppError("Item not found",
            HTTP_STATUS.NOT_FOUND,
            ERROR_CODES.ITEM_NOT_FOUND)
    }

    const expiry = item.expiry
    const current = Date.now()

    // @ts-ignore
    const diffInDays = (expiry - current) / oneDayInMs
    let status: ItemStatus = "fresh"

    if (diffInDays <= 0) {
        status = "Expired"
    } else if (diffInDays <= 10) {
        status = "Expired"
    }

    return toItemResponseWithStatusDto(item, status)
}

const updateItem = async (householdId: string, itemId: string, input: Prisma.itemUpdateInput) => {

    const result = await itemRepo.updateItemInHousehold(householdId, itemId, input)

    if (!result) {
        throw new AppError("Household Not Found",
            HTTP_STATUS.NOT_FOUND,
            ERROR_CODES.HOUSEHOLD_NOT_FOUND)
    }
    return toHouseholdDtoWithInventoryDto(result)
}

export const itemService = {
    getItemsFromHousehold,
    getItemById,
    addItemToHousehold,
    deleteItemFromHousehold,
    getItemStatus,
    updateItem,

}