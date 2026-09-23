import jwt from 'jsonwebtoken'
import {env} from "../config";
import {AppError} from "../core/errors/AppError";
import {HTTP_STATUS} from "../core/http/httpStatus";
import {ERROR_CODES} from "../core/errors/errorCodes";

const jwtSecret = env.JWT_SECRET

export  interface UserPayload extends jwt.JwtPayload{
    id: string;
    email: string,
}


export function generateAccessToken({email,id}:UserPayload): string {


    try {
        const payload: UserPayload = { email, id }

        return jwt.sign(payload, jwtSecret, {expiresIn: '7Days'})
    } catch (error) {
        throw new AppError("Invalid username or password", HTTP_STATUS.UNAUTHORIZED, ERROR_CODES.UNAUTHORIZED, false)
    }
}


export function verifyAccessToken(token: string) {

    try {
        return  jwt.verify(token, jwtSecret) as UserPayload

    } catch (error) {

        throw new AppError("Invalid Token", HTTP_STATUS.UNAUTHORIZED, ERROR_CODES.UNAUTHORIZED, false)
    }
}