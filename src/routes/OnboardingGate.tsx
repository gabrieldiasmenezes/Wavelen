import useAuth from "../hooks/useAuth";

import LoadingPage from "../components/LoadingPage";
import Home from "../pages/Home";
import Onboarding from "../pages/Onboarding";
import LastFmTest from "../pages/LastFmTest";

export default function OnboardingGate() {
    const { userData,loading } = useAuth();


    if (loading) return <LoadingPage />;


    if (!userData?.onboardingCompleted) {
        return <Onboarding />;
    }

    return <LastFmTest />;
}