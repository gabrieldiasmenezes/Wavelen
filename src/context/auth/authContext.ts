import type { User } from "firebase/auth"
import { createContext } from "react"

interface AuthContextType {
    user: User | null
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    register: (email: string, password: string) => Promise<void>
    loginWithGoogle: () => Promise<void>
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null);