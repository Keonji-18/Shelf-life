import {prisma} from "../config/db";
import {Prisma} from "../../generated/prisma";




function getItemsFromHousehold(
    householdId: string,
    whereClause: Prisma.itemWhereInput,
    orderByClause: Prisma.itemOrderByWithRelationInput

) {

    return prisma.household.findUnique({
        where: {
            id: householdId
        },
        select: {
            inventory: {
                where: whereClause,
                orderBy: orderByClause
            }
        }
    })
}

function addItemToHousehold(item: Prisma.itemCreateInput, householdId: string) {
    return prisma.household.update({
        where: {
            id: householdId
        },
        data: {
            inventory: {
                create: [{
                    name: item.name,
                    barcode: item.barcode,
                    expiry: item.expiry,
                }]
            }
        },
        include: {
            inventory: true
        }
    })
}

function deleteItemFromHousehold(householdId: string, itemId: string) {
    return prisma.household.update({
        where: {
            id: householdId
        },
        data: {
            inventory: {
                disconnect:
                    [{id: itemId}]
            }
        },
        include: {
            inventory: true
        }
    })
}

function getItemByIdFromHousehold(householdId: string, itemId: string) {
    return prisma.household.findFirst({
        where: {
            id: householdId,
        },
        select: {
            inventory: {
                where: {
                    id: itemId
                }
            }
        }
    })
}


function updateItemInHousehold(householdId: string, itemId: string, dataSent: Prisma.itemUpdateInput) {
    return prisma.household.update({
        where: {
            id: householdId
        },
        data: {
            inventory: {
                update: {
                    where: {
                        id: itemId
                    },
                    data: {
                        ...dataSent
                    }
                }
            }
        },
        include: {
            inventory: true
        }
    })
}



export const itemRepo = {
    addItemToHousehold,
    deleteItemFromHousehold,
    getItemByIdFromHousehold,
    updateItemInHousehold,
    getItemsFromHousehold,
}