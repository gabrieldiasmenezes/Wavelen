import { createContext } from "react"


type OnboardingContext={
    search:string,
    setSearch:(s:string)=> void
    step:Step,
    MINSELECTED:number,
    itemsToShow:MediaItem[],
    selectedLength:number,
    canContinue:boolean,
    isLoading:boolean,
    isSaving:boolean
    isItemSelect:(item:string)=>boolean,
    handleSelect:(item:MediaItem)=> void,
    handleContinue:()=> void
    handleBack:()=> void
}

export const OnboardingContext=createContext<OnboardingContext | undefined>(undefined)