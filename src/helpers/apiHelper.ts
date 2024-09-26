import { env } from "@/utils/env";
import ky from "ky";
import { string } from "zod";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


const api = ky.create({
    prefixUrl: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    mode: "cors",
    credentials: "include",
    timeout: 10000
})

export const get = async <T>(endpoint: string): Promise<T> => {
    return api.get(endpoint).json();
}

export const post = async <T>(endpoint: string, data: T, options?: Partial<RequestInit>) => {
    return api.post(endpoint, {
        json: { ...data },
        ...options
    }).json()
}

export const patch = async <T>(endpoint: string, data: T, options?: Partial<RequestInit>) => {
    return api.patch(endpoint, {
        json: { ...data },
        ...options
    }).json()
}

export const del = async <T>(endpoint: string) => {
    return api.delete(endpoint).json();
}