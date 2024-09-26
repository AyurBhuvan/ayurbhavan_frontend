import { LoginType, SignUpType } from "@/schemas/authSchema";
import { post } from "./apiHelper";

interface LoginPayload extends LoginType{
    mode:string
}


export const login = async (credentials:LoginType) =>{
    const payload:LoginPayload={
        ...credentials,
        mode:"session"
    }
    return await post("auth/login",payload)
}

export const signup = async (credentials:SignUpType) =>{
    return await post("users/register",credentials);
}