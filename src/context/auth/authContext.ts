import type { User } from "firebase/auth"
import { createContext } from "react"

interface AuthContextType {
    user: User | null
    userData:UserData | null
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    register: (name:string,email: string, password: string) => Promise<void>
    loginWithGoogle: () => Promise<void>
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null);