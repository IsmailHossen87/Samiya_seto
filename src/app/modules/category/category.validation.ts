// category.validation.ts
import { z } from "zod";

const createCategory = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    icon: z.string().optional(),
    status: z.enum(['active', 'hidden']).optional().default('active'),
})

export const categoryValidation = {
    createCategory
}
