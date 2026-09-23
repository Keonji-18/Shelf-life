
export interface ApiSuccessResponse<T>{
    success: true,
    data: T
    meta? : Record<string, unknown>
}

export interface ApiErrorDetail{
    path?: string,
    message: string,
    code? : string,
}

export interface ApiErrorResponse{
    success: false,
    error: {
        code: string,
        message: string
        details? : ApiErrorDetail[]
    }
    meta? : {
        requestId?: string,
    }


}