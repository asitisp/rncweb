import {z} from 'zod';

export const signInSchema = z.object({
    identifier: z.string().min(3, "Identifier must be at least 3 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long").max(15, "Password must be at most 15 characters long")