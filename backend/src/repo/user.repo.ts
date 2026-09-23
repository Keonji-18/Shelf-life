import {prisma} from "../config/db";
import type { user as User } from "../../generated/prisma";
import { Prisma } from "../../generated/prisma";



async function getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findFirst({
        where: { email },
    });
}

async function getUserById(id: string){
    return await prisma.user.findFirst({
        where: {
            id: id,
        }
    })
  
}


async function createUser(data: Prisma.userCreateInput) {
    return prisma.user.create({
        data,
    });
}


export const userRepo={
    getUserByEmail,
    getUserById,
    createUser
}