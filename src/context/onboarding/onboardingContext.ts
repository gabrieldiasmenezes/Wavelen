import { createContext } from "react"

type Step = "genres" | "artists"

interface OnboardingConfig {
  title: string
  subtitle: string
  placeholder: string
  search: string
  setSearch: (value: string) => void
  chosen: string[]
  progress: number
  step: string
}

interface OnboardingContextType {
  step: Step
  setStep: (step: Step) => void
  current: OnboardingConfig
  itemsToShow: CardItem[]
  canContinue: boolean
  saving: boolean
  loadingArtists: boolean
  error: string | null
  handleCardClick: (id: string) => void
  handleContinue: () => Promise<void>
  MIN_SELECTION: number
}

export const OnboardingContext = createContext<OnboardingContextType | null>(null)