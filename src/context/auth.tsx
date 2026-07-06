
import { 
    createUserWithEmailAndPassword, GoogleAuthProvider, 
    onAuthStateChanged, signInWithEmailAndPassword, 
    signInWithPopup, signOut, type User 
} from "firebase/auth"
import { createContext, useEffect, useState, type ReactNode} from "react"
import { auth } from "../lib/firebase"

interface AuthContextType {
    user: User | null
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    register: (email: string, password: string) => Promise<void>
    loginWithGoogle: () => Promise<void>
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const login = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password)
    }

    const register = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password)
    }

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider()
        await signInWithPopup(auth, provider)
    }

    const logout = async () => await signOut(auth)
    
    return (
 
        <AuthContext.Provider value={{ user, loading, login, register, loginWithGoogle, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
