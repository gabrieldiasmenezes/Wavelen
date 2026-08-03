import useAuth from "../hook/useAuth";
import Home from "../pages/Home";
import LoadingPage from "../pages/LoadingPage";
import Onboarding from "../pages/Onboarding";

export default function OnboardingGate(){
    const {user,loading}=useAuth()
    if(loading) return <LoadingPage/>
    if(user?.onboardingCompleted) return <Home/>

    return <Onboarding/>

}