import {Request, Response} from 'express'
import {householdService} from "../services/household.service";
import {CreateHousehold} from "../validation/household.validation";
import {HTTP_STATUS} from "../core/http/httpStatus";


async function create(
    req: Request,
    res: Response
) {

    const userId = req.userId
    const input = req.body as CreateHousehold;
    const result = await householdService.createHousehold(input ,userId)

    res.status(HTTP_STATUS.CREATED).json({
        success: true,
        data: result
    })
}

async function getById(
    req: Request,
    res: Response
){
    const householdId = req.params.householdId as string;
    const result = await householdService.getHouseholdById(householdId)

    res.status(HTTP_STATUS.OK).json({
        success: true,
        data: result
    })
}

async function getDetails(
    req: Request,
    res: Response
){
    const householdId = req.params.householdId as string;

    const result = await householdService.getHouseholdDetailsById(householdId)

    res.status(HTTP_STATUS.OK).json({
        success: true,
        data: result
    })
}

async function getMembers(
    req: Request,
    res: Response
){
    const householdId = req.params.householdId as string;

    const result = await householdService.getHouseholdMembers(householdId)
    res.status(HTTP_STATUS.OK).json({
        success: true,
        data: result
    })
}

async function addMember(
    req: Request,
    res: Response
){

    const inviteCode = req.query.inviteCode as string;

    const result = await householdService.addMemberToHousehold(inviteCode, req.userId)
    res.status(HTTP_STATUS.OK).json({
        success: true,
        data: result
    })
}

async function deleteMember(
    req: Request,
    res:Response
){

    const householdId = req.params.householdId as string;
    const id = req.userId

    const result = await householdService.deleteHouseholdMember(householdId, id)

    res.status(HTTP_STATUS.OK).json({
        success: true,
        data: result
    })
}



export const householdController = {
    create,
    getById,
    getDetails,
    getMembers,
    addMember,
    deleteMember,

}