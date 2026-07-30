import useAuth from "../hooks/useAuth";

import LoadingPage from "../components/ui/LoadingPage";

import Onboarding from "../pages/Onboarding";
import Home from "../pages/Home";


export default function OnboardingGate() {
    const { userData,loading } = useAuth();


    if (loading) return <LoadingPage />;


    if (!userData?.onboardingCompleted) {
        return <Onboarding />;
    }

    return <Home/>;
}