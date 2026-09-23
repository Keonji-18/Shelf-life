import  {Request, Response, NextFunction} from "express";
import {verifyAccessToken} from "../utils/auth.util";

declare global {
    namespace  Express {
        interface Request {
            userEmail : string
            userId : string
        }
    }
}


export const authenticateUser = (
    req: Request,
    res: Response,
    next: NextFunction

)=>{

    const token:string = req.cookies.ACCESS_TOKEN;
    const result = verifyAccessToken(token)

    req.userId = result.id
    req.userEmail = result.email

    next()
}