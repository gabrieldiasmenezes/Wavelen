import { useContext } from "react"
import { OnboardingContext } from "../context/onboarding/OnboardingContext"




export default function useOnboarding() {
  const context = useContext(OnboardingContext)

  if (!context) {
    throw new Error("useOnboarding must be used inside OnboardingProvider")
  }

  return context
}