import { useContext } from "react";
import { AuthContext } from "../context/auth/authContext";


export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }

  return context;
}