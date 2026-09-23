
import {Register} from "tsx/esm/api";
import {RegisterUser} from "../validation/user.validation";
import {user as User} from "../../generated/prisma";

export interface UserResponseDto {
    id: string
    name: string
    email: string
    householdId ?: string | null
    createdAt: Date;
    updatedAt: Date;


}

export interface userLoginDto {
    data: UserResponseDto;
    token: string;
}

export function toUserResponseDto(user:User):UserResponseDto{


    if(user.householdId !== null){
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            householdId: user.householdId,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    }
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }

}

export function toUserLoginDto(user:User, token:string){
    return {
        user: {
            id: user.id,
            name: user.name,
            email : user.email,
            createdAt: user.createdAt,
            updatedAt : user.updatedAt
            },

        token

    }
}

