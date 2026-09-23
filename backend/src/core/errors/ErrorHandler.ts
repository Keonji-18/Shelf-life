import {ErrorRequestHandler, NextFunction, Request, Response} from "express";
import {getRequestId} from "../../context/request-context";
import {ZodError} from "zod";
import {ApiErrorDetail, ApiErrorResponse} from "../http/ApiResponse";
import {logger} from "../../config";
import {ERROR_CODES} from "./errorCodes";
import {HTTP_STATUS} from "../http/httpStatus";
import {AppError} from "./AppError";


export const errorHandler: ErrorRequestHandler = (
    err,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    if (res.headersSent) {
        next(err)
        return
    }
    // If res.headersSent is true, Express cannot send a clean, new error response (like a 500 Internal Server Error page).next(err)
    // tells Express: "Hey, I cannot handle this error cleanly. Please pass this err along to the next error handler in " +
    // "line."Because no other custom handlers should run at this stage, Express hands the error
    // over to its built-in default error handler. The default handler safely terminates the
    // connection and closes the stream without trying to rewrite the headers.
    // The return statement is vital. It immediately stops the execution of your current function
    // Without return, the code below this block would continue to run. That code would likely try
    // to execute something like res.status(500).json(...), which breaks the Golden Rule of HTTP.

    const requestId = getRequestId();

    if (err instanceof ZodError) {
        const details: ApiErrorDetail[] = err.issues.map((issue) => ({
            ...(issue.path.length > 0 && {
                path: issue.path.join(".")
            }),
            message: issue.message,
            code: issue.code

        }))

        logger.warn(ERROR_CODES.VALIDATION_ERROR, {
            method: req.method,
            path: req.originalUrl,
            requestId: requestId,
            details: details
        })

        const response: ApiErrorResponse = {
            success: false,
            error: {
                code: ERROR_CODES.VALIDATION_ERROR,
                message: "Request Validation Failed",
                details: details
            },
            ...(requestId !== undefined && {
                meta: {requestId}
            })
        }

        res
            .status(HTTP_STATUS.BAD_REQUEST)
            .json(response)
        return;
    }

    if (err instanceof AppError) {

        logger.warn(ERROR_CODES.OPERATION_ERROR, {

            method: req.method,
            path: req.originalUrl,
            requestId: requestId,
            errCode: err.code,
            message: err.message,
            statusCode: err.statusCode
        })

        const response: ApiErrorResponse = {
            success: false,

            error: {
                code: err.code,
                message: err.message,
                ...(err.details !== undefined && {
                    details: err.details,
                })
            },
            ...(requestId !== undefined && {
                meta: {requestId}
            })

        }

        res
            .status(err.statusCode)
            .json(response)
        return;
    }

    logger.warn(ERROR_CODES.UNEXPECTED_ERROR, {
        error: err instanceof Error ? err.message : String(err),

        stack: err instanceof Error ? err.stack : undefined,

        method: req.method,
        path: req.originalUrl,
        requestId,

    })

    const response: ApiErrorResponse = {
        success: false,

        error: {
            code: ERROR_CODES.INTERNAL_SERVER_ERROR,

            message:
                process.env.NODE_ENV === "production" ? "Internal server error" : err instanceof Error ? err.message : "Unknown error",
        },

        ...(requestId !== undefined && {
            meta: {
                requestId,
            },
        }),
    }
    res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json(response);


}