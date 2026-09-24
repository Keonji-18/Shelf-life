import {z} from 'zod';


export const addItemInputSchema = z.object({
    name: z.string(),
    barcode: z.coerce.string().length(12),
    expiry: z.coerce.date()
})

export type ItemInput = z.infer<typeof addItemInputSchema>

export const updateItemInputSchema = z.object({
    name: z.string().optional(),
    barcode: z.coerce.string().optional(),
    expiry: z.coerce.date().optional(),
})

export type UpdateItemInput = z.infer<typeof updateItemInputSchema>