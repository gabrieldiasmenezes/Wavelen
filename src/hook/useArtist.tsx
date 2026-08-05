import { useEffect, useState } from "react"
import { getArtists, getPopularArtists } from "../service/deezer"


export default function useArtists(step:Step,search:string){
    const [artists,setArtists]=useState<MediaItem[]>([])
    const [popularArtists,setPopularArtists]=useState<MediaItem[]>([])
    const [isLoading,setIsLoading]=useState(true)
    useEffect(()=>{

        const fetchArtist= async ()=>{
            setIsLoading(true)
            const popular= await getPopularArtists()
            setArtists(popular)
            setPopularArtists(popular)
            setIsLoading(false)
        }
        fetchArtist()
    },[])

    useEffect(()=>{
        if(step !== "artist") return

        let cancelled = false

        if(search.trim() == ""){
            setArtists(popularArtists)
            return ()=>{cancelled=true}
        }

        setIsLoading(true)
        const timer=setTimeout(async () => {
            const searchResults = await getArtists(search)
            if (cancelled) return
            setArtists(searchResults.slice(0,6))
            setIsLoading(false)
        },300)

        return ()=> {
            cancelled= true 
            clearTimeout(timer)
        }
    },[search,step,popularArtists])

    return {artists,isLoading}
}