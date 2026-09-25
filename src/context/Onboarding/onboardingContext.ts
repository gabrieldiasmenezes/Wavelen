import { createContext } from "react"


type OnboardingContext={
    search:string,
    setSearch:(s:string)=> Promise<void>,
    step:Step,
    MINSELECTED:number,
    error:string,
    itemsToShow:MediaItem[],
    selectedLength:number,
    canContinue:boolean,
    isLoading:boolean,
    isSaving:boolean,
    isItemSelect:(item:string)=>boolean,
    handleSelect:(item:MediaItem)=> Promise<void>,
    handleContinue:()=> Promise<void>,
    handleBack:()=> Promise<void>,
}

export const OnboardingContext=createContext<OnboardingContext | null>(null)