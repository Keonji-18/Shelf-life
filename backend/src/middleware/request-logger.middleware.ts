import {logger} from "../config";
import {Request, Response, NextFunction} from "express";

export function requestLoggerMiddleware(
    req:Request,
    res:Response,
    next: NextFunction
) {
    const startTime = process.hrtime.bigint();

    logger.info("Request Started",{
        method: req.method,
        path: req.originalUrl
    })

    res.on("finish", ()=>{
        const durationNs =  process.hrtime.bigint() - startTime;
        const durationMs = Number(durationNs) / 1000000

        logger.info("Request Completed",{
            method: req.method,
            path: req.originalUrl,
            statusCode: res.statusCode,
            durationMs: durationMs,
        })
    })
    next()
}