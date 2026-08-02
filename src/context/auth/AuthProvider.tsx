import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./authContext";
import AuthError from "../../utils/authError";
import * as authService from "../../service/authService";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase";

type AuthProviderProps={
    children:ReactNode
}
export default function AuthProvider({children}:AuthProviderProps){
    const [user,setUser]=useState<User | null>(null)
    const [loading,setLoading]= useState(true)
    const [error,setError] =useState("")

    useEffect(() => {
        setLoading(true);
        const unsubscribe=onAuthStateChanged(auth, async (currentUser)=>{
            try{
                if(!currentUser) {
                    setUser(null);
                    setLoading(false);
                    setError("")
                    return 
                }

                const docSnap = await authService.getUser(currentUser.uid);
    
                setUser({uid:currentUser.uid,...docSnap.data()});

            }catch(e){
                setError(AuthError(e));
                console.log(e);
            }finally{
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
            setError(AuthError(e))
            console.log(e)
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
            setError(AuthError(e))
            console.log(e)
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
            setError(AuthError(e))
            console.log(e)
        }finally{
            setLoading(false)
        }
    }

    const logout=()=>{
        setUser(null)
    }


    return(
        <AuthContext.Provider value={{user,loading,error,loginWithEmailPassword,authWithGoogle,register,logout}}>
            {children}
        </AuthContext.Provider>
    )
}