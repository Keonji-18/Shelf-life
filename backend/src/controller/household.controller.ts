import {Request, Response} from 'express'
import {householdService} from "../services/household.service";
import {CreateHousehold} from "../validation/household.validation";
import {HTTP_STATUS} from "../core/http/httpStatus";
import {ItemInput, UpdateItemInput} from "../validation/item.vaidation";
import {Prisma} from "../../generated/prisma";


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

async function addItem(
    req: Request,
    res: Response
){
    const householdId = req.params.householdId as string;
    const itemInput = req.body as ItemInput;
    console.log(itemInput)

    const result = await householdService.addItemToHousehold(householdId, itemInput)

    res.status(HTTP_STATUS.OK).json({
        success: true,
        data: result
    })
}


async function deleteItem(
    req: Request,
    res: Response
){

    const householdId = req.params.householdId as string;
    const itemId = req.params.itemId as string;


    const result = await householdService.deleteItemFromHousehold(householdId, itemId)

    res.status(HTTP_STATUS.OK).json({
        success: true,
        data: result
    })
}


async function getItemStatus(
    req: Request,
    res: Response
){
    const householdId = req.params.householdId as string;
    const itemId = req.params.itemId as string;

    const result = await householdService.getItemStatus(householdId, itemId)
    res.status(HTTP_STATUS.OK).json({
        success: true,
        data: result
    })
}

async function updateItem(
    req: Request,
    res: Response
){
    const householdId = req.params.householdId as string;
    const itemId = req.params.itemId as string;
    const input = req.body as Prisma.itemUpdateInput;

    const result = await householdService.updateItem(householdId, itemId, input)
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
    addItem,
    deleteItem,
    getItemStatus,
    updateItem,
}