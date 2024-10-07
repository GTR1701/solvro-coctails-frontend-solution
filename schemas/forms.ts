import * as z from 'zod'

export const searchFormSchema = z.object({
    name: z.string(),
})