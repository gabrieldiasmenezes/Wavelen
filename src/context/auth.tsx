
import { 
    createUserWithEmailAndPassword, GoogleAuthProvider, 
    onAuthStateChanged, signInWithEmailAndPassword, 
    signInWithPopup, signOut, 
    type AuthError, type User 
} from "firebase/auth"
import { createContext, useContext, useEffect, useState, type ReactNode} from "react"
import { auth } from "../lib/firebase"

interface AuthContextType {
    user: User | null
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    register: (email: string, password: string) => Promise<void>
    loginWithGoogle: () => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null);

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

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}

export function getAuthErrorMessage(error: AuthError): string {
  switch (error.code) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Email ou senha incorretos.'
    case 'auth/email-already-in-use':
      return 'Este email já está cadastrado.'
    case 'auth/weak-password':
      return 'A senha deve ter pelo menos 6 caracteres.'
    case 'auth/invalid-email':
      return 'Email inválido.'
    case 'auth/popup-closed-by-user':
      return 'Login com Google cancelado.'
    case 'auth/too-many-requests':
      return 'Muitas tentativas. Tente novamente em alguns minutos.'
    default:
      return 'Ocorreu um erro. Tente novamente.'
  }
}