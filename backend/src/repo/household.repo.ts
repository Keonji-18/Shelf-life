import {prisma} from "../config/db";
import {household as Household, Prisma} from "../../generated/prisma";

const household = Prisma.validator<Prisma.householdDefaultArgs>()({
    include: {
        members: true,
        inventory: true,
    }
})
const householdWithMembers = Prisma.validator<Prisma.householdDefaultArgs>()({
    include: {members: true}
});

const householdWithInventory = Prisma.validator<Prisma.householdDefaultArgs>()({
    include: {inventory: true}
});

export type FullHousehold = Prisma.householdGetPayload<typeof household>  | null
export type HouseholdWithMembers = Prisma.householdGetPayload<typeof  householdWithMembers> | null
export type HouseholdWithInventory = Prisma.householdGetPayload<typeof householdWithInventory> | null

function getHouseholdById(id: string): Promise<Household | null> {
    return  prisma.household.findFirst(
        {
            where: {
                id: id
            },
        }
    )
}

function getHouseholdDetailsById(id: string): Promise<FullHousehold | null> {
    return  prisma.household.findUnique(
        {
            where: {
                id: id
            },
            include: {
                members: true,
                inventory: true
            }

        }
    )
}

 function getAllHouseholds() {
    return  prisma.household.findMany({
            include: {
                members: true,
                inventories: true
            }
        }
    )
}

 function createHousehold(household: Prisma.householdCreateInput, userID: string) {
    return  prisma.household.create({
        data: {
            name: household.name,
            inviteCode: household.inviteCode,

            members: {
                connect: {
                    id: userID
                }
            },
        },
        include: {members: true}
    })
}

function getHouseholdWithAllMembers(householdId: string) {
    return prisma.household.findUnique({
        where: {
            id: householdId
        },
        include: {members: true}
    })
}

function addMemberToHousehold(inviteCode: string, userId: string) {
    return prisma.household.update({
        where: {
            inviteCode: inviteCode
        },
        data: {
            members: {
                connect: {
                    id: userId
                }
            }
        },
        include: {
            members: true
        }
    })

}

function deleteMemberFromHousehold(householdId: string, userId: string) {
    return prisma.household.update({
        where: {
            id: householdId
        },
        data: {
            members: {
                disconnect: {
                    id: userId
                }
            }
        },
        include: {
            members: true
        }
    })

}


export const householdRepo = {
    getHouseholdById,
    getHouseholdDetailsById,
    getAllHouseholds,
    createHousehold,
    getHouseholdWithAllMembers,
    addMemberToHousehold,
    deleteMemberFromHousehold
}


