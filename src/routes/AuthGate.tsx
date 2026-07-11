import LoadingPage from "../components/LoadingPage";
import useAuth from "../hooks/useAuth";
import Auth from "../pages/Auth";
import OnboardingGate from "./OnboardingGate";





export default function AuthGate() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingPage/>

  if (!user) {
    return <Auth />;
  }

  return <OnboardingGate />;
}