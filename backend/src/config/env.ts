import "dotenv/config"
import {z} from "zod"

const envSchema = z.object({
    PORT: z.coerce.number().int().min(1).max(65535).default(3001),
    NODE_ENV: z.enum(["development", "test","production"]).default("development"),
    DATABASE_URL: z.url(),
    JWT_SECRET: z.string().min(32,"Secret must be 32 characters long"),
})



const result = envSchema.safeParse(process.env)

if(!result.success) {
    console.error("Invalid Environment Variable")
    console.error(
        z.prettifyError(result.error)
    )

    process.exit(1)
}

export const env = result.data