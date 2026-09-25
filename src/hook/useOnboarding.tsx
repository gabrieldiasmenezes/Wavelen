import { useContext } from "react";
import { OnboardingContext } from "../context/Onboarding/onboardingContext";

export default function useOnboarding(){
    const context=useContext(OnboardingContext)
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context
}