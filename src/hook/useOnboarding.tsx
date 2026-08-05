import { useContext } from "react";
import { OnboardingContext } from "../context/Onboarding/onboardingContext";

export default function useOnboarding(){
    const context=useContext(OnboardingContext)
    return context
}