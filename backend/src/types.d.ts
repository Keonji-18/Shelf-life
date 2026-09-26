export type ItemStatus = 'fresh' | "Expires Soon" | "Expired"

// sorting/filtering query
export type ItemQuery = {
    search? : string,
    name? : string,
    sortBy? : "name" | "expiry"
    sortOrder? : "asc" | "desc"
}