import {onAuthStateChanged,type User,} from "firebase/auth";
import {useEffect,useState,type ReactNode,} from "react";
import { auth, db } from "../../lib/firebase";
import { AuthContext } from "./AuthContext";
import * as authService from "../../services/authService";
import * as userService from "../../services/userService";
import { doc, onSnapshot } from "firebase/firestore";

export function AuthProvider({children,}: { children: ReactNode; }) {
  const [user, setUser] =useState<User | null>(null);

  const [userData, setUserData] =useState<UserData | null>(null);

  const [loading, setLoading] =useState(true);

  useEffect(() => {

        let unsubscribeSnapshot: (() => void) | null = null;

        const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
        try {
            if (unsubscribeSnapshot) {
                unsubscribeSnapshot();
                unsubscribeSnapshot = null;
            }

            if (!firebaseUser) {
                setUser(null);
                setUserData(null);
                return;
            }

            await userService.syncUser(firebaseUser);
            setUser(firebaseUser);

            unsubscribeSnapshot = onSnapshot(
            doc(db, "users", firebaseUser.uid),
            (snap) => {
                if (snap.exists()) {
                    setUserData(snap.data() as UserData);
                }
            }
            );
        } finally {
            setLoading(false);
        }
        });

        return () => {
            unsubscribeAuth();
            if (unsubscribeSnapshot) unsubscribeSnapshot();
        };
    }, []);

  async function login(email: string,password: string) {
    await authService.login(email, password);
  }

  async function register(name: string,email: string,password: string) {
    const firebaseUser = await authService.register(name,email,password);

    const data = await userService.syncUser(firebaseUser);

    setUser(firebaseUser);
    setUserData(data);
  }

  async function loginWithGoogle() {
    const firebaseUser = await authService.loginWithGoogle();

    const data = await userService.syncUser(firebaseUser);

    setUser(firebaseUser);
    setUserData(data);
  }

  async function logout() {
    await authService.logout();

    setUser(null);
    setUserData(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,userData,
        loading,login,
        register,loginWithGoogle,
        logout,
      }}>

      {!loading && children}
      
    </AuthContext.Provider>
  );
}