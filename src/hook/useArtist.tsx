import { useEffect, useState } from "react"
import { getArtists, getPopularArtists } from "../service/deezer/artists"



export default function useArtists(step:Step,search:string){
    const [artists,setArtists]=useState<MediaItem[]>([])
    const [popularArtists,setPopularArtists]=useState<MediaItem[]>([])
    const [isLoading,setIsLoading]=useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(()=>{

        const fetchArtist= async ()=>{
            try{
                setIsLoading(true)
                setError(null)
                const popular= await getPopularArtists()
                setArtists(popular)
                setPopularArtists(popular)

            }catch(e){
                setArtists([])
                setPopularArtists([])
                setError("Something went wrong while loading artists.")
            }finally{
                setIsLoading(false)
            }
        }
        fetchArtist()
    },[])

    useEffect(()=>{
        if(step !== "artist") return

        let cancelled = false

        if(search.trim() == ""){
            setArtists(popularArtists)
            setError(null)
            return ()=>{cancelled=true}
        }

        setIsLoading(true)
        setError(null)
        const timer=setTimeout(async () => {
            try{
                const searchResults = await getArtists(search)
                if (cancelled) return
                setArtists(searchResults.slice(0,6))
                setIsLoading(false)

            }catch{
                if(cancelled) return
                setArtists([])
                setError("Something went wrong while searching artists.")
            }finally{
                if(!cancelled) setIsLoading(false)
            }
        },300)

        return ()=> {
            cancelled= true 
            clearTimeout(timer)
        }
    },[search,step,popularArtists])

    return {artists,isLoading,error}
}