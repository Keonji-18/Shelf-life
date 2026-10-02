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

export type CreateHouseholdResponseBody = {
    id: string,
    name: string,
    inviteCode: string,
    "createdAt": string,
    "updatedAt": string
}

export type HouseholdMemberBody = {
    "id": string,
    "name": string,
    "email": string,
    "householdId": string,
    "createdAt": string,
    "updatedAt": string
}
export type ItemResponseBody = {
    "id": string,
    "name": string,
    "barcode": string,
    "expiry": string,
    "householdId": string,
    "createdAt": string,
    "updatedAt": string
}

export type HouseholdWithMemberResponseBody = {
    "id": string,
    "name": string,
    inviteCode: string,
    members: HouseholdMemberBody[],
    createdAt: string,
    "updatedAt": string,
}

export type HouseholdWithFullDetails = {
    "id": string,
    "name": string,
    inviteCode: string,
    members: HouseholdMemberBody[],
    inventory: ItemResponseBody[],
    createdAt: string,
    "updatedAt": string,
}