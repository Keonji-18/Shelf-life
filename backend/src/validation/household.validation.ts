import {z}  from "zod";

export const createHouseholdSchema = z.object({
    name : z.string().min(5, "Household name must be at least of 5 characters")

})

export type CreateHousehold = z.infer<typeof createHouseholdSchema>