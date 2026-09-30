export type LogInResponseBody = {
    "id": string,
    "name": string,
    "email": string,
    householdId?: string|null
    "createdAt": string,
    "updatedAt": string

}

export type LogOutResponse = {
    success: boolean,
    message: string
}