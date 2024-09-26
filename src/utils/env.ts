import { z } from "zod";

const envSchema=z.object({
    NEXT_PUBLIC_API_BASE_URL:z.string({
        message:"url required"
    }).url({
        message:"must be a valid url"
    })
})
console.log(process.env.NEXT_PUBLIC_API_BASE_URL);

export const env=envSchema.parse(process.env)