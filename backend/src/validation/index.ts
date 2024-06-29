import z from 'zod';

export const signupInput = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phoneNumber: z.string(),
    password: z.string()
})


export const signinInput = z.object({
    email: z.string().email(),
    password: z.string()
})

export const updateInput = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phoneNumber: z.string().optional(),
    password: z.string().optional()
})