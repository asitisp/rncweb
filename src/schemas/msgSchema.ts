import {z} from 'zod';

export const msgSchema= z.object({
    content:z.string()
        .min(1, "Message content must be at least 1 character long")
        .max(1000, "Message content must be at most 1000 characters long")
        
})