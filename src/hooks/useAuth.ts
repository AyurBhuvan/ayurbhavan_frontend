import { login, signup } from "@/helpers/authHelper";
import { LoginType, SignUpType } from "@/schemas/authSchema";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router"


export const useLoginUser=()=>{
    const router=useRouter();
    
    return useMutation({
        mutationFn:(credentials:LoginType)=>login(credentials),
        onSuccess: ()=>{
            router.push("/")
        }
    }) 
}

export const useRegisterUser=()=>{
    const router=useRouter();
    
    return useMutation({
        mutationFn:(credentials:SignUpType)=>signup(credentials),
        onSuccess: ()=>{
            router.push("/")
        }
    }) 
}