import {randomUUID} from "node:crypto";
import {CreateHousehold} from "../validation/household.validation";
import {householdRepo} from "../repo/household.repo";
import {toHouseholdResponseDto, toHouseholdWithMembersDto} from "../dto/household.dto";
import {AppError} from "../core/errors/AppError";
import {HTTP_STATUS} from "../core/http/httpStatus";
import {ERROR_CODES} from "../core/errors/errorCodes";


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

export const householdService = {
    createHousehold,
    getHouseholdById,
    getHouseholdMembers,
    addMemberToHousehold,
    deleteHouseholdMember
}