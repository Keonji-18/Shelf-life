import {ErrorCode} from "./errorCodes";
import {HttpStatusCode} from "../http/httpStatus";
import {ApiErrorDetail} from "../http/ApiResponse";


export class AppError extends Error {
    public readonly statusCode: HttpStatusCode;
    public readonly code: ErrorCode;
    public readonly isOperational: boolean;
    public readonly details?: ApiErrorDetail[]

    constructor(message:string, statusCode: HttpStatusCode, code: ErrorCode, isOperational: boolean = true, details?: ApiErrorDetail[]) {

        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = isOperational;

        if (details !== undefined) {
            this.details = details;
        }

        Error.captureStackTrace(this, AppError)
    }
}