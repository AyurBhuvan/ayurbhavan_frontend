import { login, logout, signup } from "@/helpers/authHelper";
import { LoginType, SignUpType } from "@/schemas/authSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { useRouter } from "next/router"
import { toast } from "sonner";


export const useLoginUser=()=>{
    const router=useRouter();
    const qc=useQueryClient();
    return useMutation({
        mutationFn:(credentials:LoginType)=>login(credentials),
        onSuccess: async (data)=>{
            qc.refetchQueries({
                queryKey: ["currentUser"],
            })
            console.log(data);
            
            // setUser()
            router.push("/")
        },
        onError: async (err) => {
            if (err.name == "HTTPError") {
                const httpError = err as HTTPError;
                const errJson = await httpError.response.json<any>();

                // console.log();
                
                toast.error(errJson.errors[0].message)
            }
            else {
                toast.error("Network Error");
            }   
    }})
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

export const useLogOutUser=()=>{
    const router=useRouter();

    return useMutation({
        mutationFn:()=>logout(),
        onSuccess: ()=>{
            router.push("/auth/login")
        }
    })
}