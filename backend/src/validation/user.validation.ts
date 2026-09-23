import {z} from "zod";

export const registerUserSchema = z.object({
    name : z.string().min(3, "Name should be at least 3 characters"),
    email: z.email(),
    password: z.string().min(8, "Password should have at least 8 characters").max(32, "Password should be at max 32 characters"),

})


export type RegisterUser = z.infer<typeof registerUserSchema>


export const loginUserSchema = z.object({
    email : z.email(),
    password: z.string().min(8, "Password should be at least 8 characters").max(32, "Password should be at max 32 characters"),
})

export type LoginUser = z.infer<typeof loginUserSchema>

