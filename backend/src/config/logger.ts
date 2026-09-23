import winston from 'winston'
import {env} from "./env";
import {getRequestId} from "../context/request-context";


const requestIdFormat = winston.format((info)=>{
    info.requestId = getRequestId()

    return info
})


export const logger = winston.createLogger({
    level: env.NODE_ENV === "development" ? "debug" : "info",
    format: winston.format.combine(
        requestIdFormat(),
        winston.format.timestamp(),
        winston.format.errors({stack:true}),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console()
    ]

})