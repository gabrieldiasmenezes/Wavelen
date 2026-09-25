import { useCallback, useDeferredValue, useMemo, useState, type ReactNode } from "react";
import { musicGenres } from "../../data/musicGenre";
import { OnboardingContext } from "./onboardingContext";
import useArtists from "../../hook/useArtist";
import useAuth from "../../hook/useAuth";
import completeOnboarding from "../../service/onboardingService";

type OnboardingProviderProps={
    children:ReactNode
}

const MINSELECTED=3

export default function OnboardingProvider({children}:OnboardingProviderProps){
    // States
    const [search,setSearch]=useState("")
    const [selectedGenres,setSelectedGenres]=useState<string[]>([])
    const [selectedArtists,setSelectedArtists]=useState<MediaItem[]>([])
    const [step,setStep]=useState<Step>("genre")
    const [isSaving,setIsSaving]=useState(false)

    //Hooks
    const {artists,isLoading,error}=useArtists(step,search)
    const {user,loadUser}=useAuth()

    const selectedLength= step == "genre" ? selectedGenres.length : selectedArtists.length 

    const canContinue= selectedLength >= MINSELECTED 

    const defferedSearch=useDeferredValue(search)

    const genreFiltered=useMemo(()=>{
        if(step == "genre") {
            return musicGenres.filter((genrer)=> genrer.name.toLowerCase().includes(defferedSearch.toLowerCase()))
        }
        return []
    },[defferedSearch,step])

    const itemsToShow=useMemo(()=>{
        if(step == "genre"){
            return search.trim() === "" ? genreFiltered?.slice(0,6) : genreFiltered
        }

        return artists
    },[step,search,genreFiltered,artists])

    const selectedNamesSet=useMemo(()=>{
        if(step == "genre") return new Set(selectedGenres)
        return new Set(selectedArtists.map((artists)=>artists.name))
    },[step,selectedGenres,selectedArtists])
    
    const isItemSelect=useCallback((item:string)=>{
        return selectedNamesSet.has(item)
    },[selectedNamesSet])

    
    const handleSelect= useCallback((item:MediaItem)=>{
        if(step == "genre"){
            setSelectedGenres((prev)=>
                prev.includes(item.name) 
                ? prev.filter((select)=> select != item.name)
                : [...prev,item.name]
            )
        }else{
            setSelectedArtists((prev)=>{
                const exists=prev.some((e)=> e.name == item.name)
                if (exists) {
                    return prev.filter((select)=> select.name != item.name)
                }else {
                    return [...prev,item]
                }
            })
        }

    },[step])

    const handleContinue= async ()=>{
        if (!canContinue) return 
        if(step == "genre"){
            setSearch("")
            setStep("artist")
            return
        }

        if(!user?.uid) return
        setIsSaving(true)
        await completeOnboarding({uid:user.uid,genres:selectedGenres,artists:selectedArtists})
        await loadUser(user.uid)
        setIsSaving(false)

    }
    const handleBack=()=>{
        if(step !== "artist") return
        setSearch("")
        setStep("genre")
    }

    const contextValue= useMemo(()=>({
        search,setSearch,step,MINSELECTED,error,itemsToShow,selectedLength,canContinue,isLoading,isSaving,isItemSelect,handleSelect,handleContinue,handleBack
    }),[search,setSearch,step,MINSELECTED,error,itemsToShow,selectedLength,canContinue,isLoading,isSaving,isItemSelect,handleSelect,handleContinue,handleBack])

    return(
        <OnboardingContext.Provider value={contextValue}>
            {children}
        </OnboardingContext.Provider>
    )
}