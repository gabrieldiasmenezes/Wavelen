import useAuth from "../hooks/useAuth";

import LoadingPage from "../components/LoadingPage";

import Onboarding from "../pages/Onboarding";
import MusicTest from "../pages/MusicTest";


export default function OnboardingGate() {
    const { userData,loading } = useAuth();


    if (loading) return <LoadingPage />;


    if (!userData?.onboardingCompleted) {
        return <Onboarding />;
    }

    return <MusicTest/>;
}