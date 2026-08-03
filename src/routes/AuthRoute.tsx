import Auth from "../pages/Auth";
import useAuth from "../hook/useAuth";
import LoadingPage from "../pages/LoadingPage";
import OnboardingGate from "./OnboardingGate";

export default function AuthGate(){
    const {user,loading}=useAuth()
    if (loading) return <LoadingPage/>
    if(!user) return <Auth/>
    return <OnboardingGate/>

}