import { createContext, type Dispatch, type SetStateAction } from "react"


type OnboardingContext = {
    search: string
    setSearch: Dispatch<SetStateAction<string>>

    step: Step
    MINSELECTED: number

    error: string | null

    itemsToShow: MediaItem[]
    selectedLength: number
    canContinue: boolean

    isLoading: boolean
    isSaving: boolean

    isItemSelect: (item: string) => boolean
    handleSelect: (item: MediaItem) => void
    handleContinue: () => Promise<void>
    handleBack: () => void
}

export const OnboardingContext =
    createContext<OnboardingContext | null>(null)