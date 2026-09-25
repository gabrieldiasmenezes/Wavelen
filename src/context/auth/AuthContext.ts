
import { createContext } from "react"
import type { User } from "../../types/user"

type AuthContextType={
    user:User | null,
    loading:boolean,
    error:string,
    loadUser:(uid:string)=>Promise<void>,
    loginWithEmailPassword:(email:string,password:string) => Promise<void>,
    authWithGoogle:() => Promise<void>,
    logout:()=>Promise<void>,
    register:(name:string,email:string,password:string) => Promise<void>
}

export const AuthContext=createContext<AuthContextType | null>(null)