import {Request, Response} from "express";
import {itemService} from "../services/item.service";
import {ItemInput} from "../validation/item.vaidation";
import {HTTP_STATUS} from "../core/http/httpStatus";
import {Prisma} from "../../generated/prisma";
import {ItemQuery} from "../types";


async function getAllItems(
    req: Request,
    res: Response,
){

    const householdId = req.params.householdId as string;
    const {search, sortBy, sortOrder} = req.query as ItemQuery

    const whereClause:Prisma.itemWhereInput = {}
    let orderByClause: Prisma.itemOrderByWithRelationInput = { createdAt: 'desc' };

    if(search){
        whereClause.name = {
            contains: search,
            mode: "insensitive"
        }
    }

    if(sortBy && sortOrder){
        orderByClause = {
            ...orderByClause,
            [sortBy]: sortOrder,
        }
    }

    const result = await itemService.getItemsFromHousehold(householdId, whereClause, orderByClause)

    res.status(HTTP_STATUS.OK)
        .json({
            success: true,
            data: result,
        })
}

async function getItemById(
    req: Request,
    res: Response,
){

    const householdId = req.params.householdId as string;
    const itemId = req.params.itemId as string;

    const result = await itemService.getItemById(householdId, itemId);

    res.status(HTTP_STATUS.OK)
    .json({
        success: true,
        data: result,
    })

}

async function addItem(
    req: Request,
    res: Response
){
    const householdId = req.params.householdId as string;
    const itemInput = req.body as ItemInput;
    console.log(itemInput)

    const result = await itemService.addItemToHousehold(householdId, itemInput)

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


    const result = await itemService.deleteItemFromHousehold(householdId, itemId)

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

    const result = await itemService.getItemStatus(householdId, itemId)
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

    const result = await itemService.updateItem(householdId, itemId, input)
    res.status(HTTP_STATUS.OK).json({
        success: true,
        data: result
    })
}

export const itemController = {
    addItem,
    deleteItem,
    getItemStatus,
    updateItem,
    getAllItems,
}