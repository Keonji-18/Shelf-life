import {Request, Response, NextFunction} from "express";
import {randomUUID} from "node:crypto";
import {requestContext} from "../context/request-context";



export function  requestContextMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
){

    const requestId = randomUUID()

    res.setHeader("X-Request_Id", requestId);

    requestContext.run({requestId},()=>{
        next()
    });
}