import LoadingPage from "../components/LoadingPage";
import { useAuth } from "../context/auth";
import Auth from "../pages/Auth";
import Home from "../pages/Home";



export default function AuthGate() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingPage/>

  if (!user) {
    return <Auth />;
  }

  return <Home />;
}