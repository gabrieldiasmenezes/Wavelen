import { createContext } from "react"

type AuthContextType={
    user:User | null,
    loading:boolean,
    error:string,
    loadUser:(uid:string)=>void,
    loginWithEmailPassword:(email:string,password:string) => void,
    authWithGoogle:() => void,
    logout:()=>void,
    register:(name:string,email:string,password:string) => void
}

export const AuthContext=createContext<AuthContextType | undefined>(undefined)