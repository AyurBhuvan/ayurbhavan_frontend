import { z } from "zod";

interface LoginData {
    email: string;
    password: string;
}

export const loginSchema: z.ZodSchema<LoginData> = z.object({
    email: z.string().email({
        message: "Not a valid email address"
    }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(100, { message: "Password must be at most 100 characters long" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/\d/, { message: "Password must contain at least one number" })
        .regex(/[@$!%*?&#]/, { message: "Password must contain at least one special character" })
}).refine(
    (data: LoginData): boolean => {
        const emailParts: string[] = data.email.split('@')[0].split('.');
        return !emailParts.some((part: string): boolean =>
            part.length > 3 && data.password.toLowerCase().includes(part.toLowerCase())
        );
    },
    {
        message: "Password cannot contain the email address or its parts",
        path: ["password"]
    }
);

export type LoginType = z.infer<typeof loginSchema>;


interface SignUpData extends LoginData {
    first_name: string;
    last_name:string;
}

export const signupSchema: z.ZodSchema<SignUpData> = z.object({
    first_name: z.string().min(1,{
        message:"First name must be given"
    }),
    last_name:z.string().min(1,{
        message:"Last name must be given"
    }),
    email: z.string().email({
        message: "Not a valid email address"
    }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(100, { message: "Password must be at most 100 characters long" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/\d/, { message: "Password must contain at least one number" })
        .regex(/[@$!%*?&#]/, { message: "Password must contain at least one special character" })
}).refine(
    (data: SignUpData): boolean => {
        const emailParts: string[] = data.email.split('@')[0].split('.');
        return !emailParts.some((part: string): boolean =>
            part.length > 3 && data.password.toLowerCase().includes(part.toLowerCase())
        );
    },
    {
        message: "Password cannot contain the email address or its parts",
        path: ["password"]
    }
);

export type SignUpType = z.infer<typeof signupSchema>;


