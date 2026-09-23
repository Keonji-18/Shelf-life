import {prisma} from "../config/db";
import {household as Household, Prisma} from "../../generated/prisma";


async function getHouseholdById(id: string): Promise<Household | null> {

    return await prisma.household.findFirst(
        {
            where: {
                id: id
            }
        }
    )
}

async function getAllHouseholds() {

    return await prisma.household.findMany({
            include: {
                members: true
            }
        }
    )
}

async function createHousehold(household: Prisma.householdCreateInput, userID: string) {

    return await prisma.household.create({
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


const householdWithMembers = Prisma.validator<Prisma.householdDefaultArgs>()({
    include: {members: true}
});

export type HouseholdWithMembers = Prisma.householdGetPayload<typeof householdWithMembers> | null


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
    getAllHouseholds,
    createHousehold,
    getHouseholdWithAllMembers,
    addMemberToHousehold,
    deleteMemberFromHousehold,
}


