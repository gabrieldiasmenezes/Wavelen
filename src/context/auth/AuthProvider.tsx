import { useEffect, useState, type ReactNode } from "react";
import authError from "../../utils/authError";
import * as authService from "../../service/authService";
import { onAuthStateChanged, type AuthError } from "firebase/auth";
import { auth } from "../../lib/firebase";
import type { User } from "../../types/user";
import { AuthContext } from "./AuthContext";

type AuthProviderProps={
    children:ReactNode
}
export default function AuthProvider({children}:AuthProviderProps){
    const [user,setUser]=useState<User | null>(null)
    const [loading,setLoading]= useState(true)
    const [error,setError] =useState("")

    const loadUser= async (uid:string)=>{
        try{
            setLoading(true)
            const docSnap = await authService.getUser(uid);
            setUser({
                uid:uid,
                ...docSnap.data()
            });
        }catch(e){
            setError(authError(e as AuthError));
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        const unsubscribe=onAuthStateChanged(auth, async (currentUser)=>{
            try{
                if(!currentUser) {
                    setUser(null);
                    setLoading(false);
                    setError("")
                    return 
                }

                await loadUser(currentUser.uid)

            }catch(e){
                setError(authError(e as AuthError));
                setLoading(false)
            }
        })


        return()=>unsubscribe();
    },[]);
    
    const loginWithEmailPassword= async (email:string,password:string)=>{
        try{
            setLoading(true)
            setError("")
            const userData = await authService.loginWithEmailPassword(email,password)
            setUser(userData);
        }catch(e){
            setError(authError(e as AuthError))
        }finally{
            setLoading(false)
        }

    }

    const authWithGoogle= async ()=>{
        try{
            setLoading(true)
            setError("")
            const userData=await authService.authWithGoogle();
            setUser(userData);

        }catch(e){
            setError(authError(e as AuthError))
        }finally{
            setLoading(false)
        }
    }

    const register= async (name:string,email:string,password:string) => {
        try{
            setError("");
            setLoading(true);

            const userData = await authService.register(name,email,password);
            setUser(userData);

        }catch(e){
            setError(authError(e as AuthError))
        }finally{
            setLoading(false)
        }
    }

    const logout= async()=>{
        try{
            setError("")
            await authService.logout()
        }catch(e){
            setError(authError(e as AuthError))
        }
    }


    return(
        <AuthContext.Provider value={{user,loading,error,loadUser,loginWithEmailPassword,authWithGoogle,register,logout}}>
            {children}
        </AuthContext.Provider>
    )
}