import { useEffect, useState } from "react";
import { getArtists } from "../service/deezer/artists";
import { getTracks } from "../service/deezer/tracks";

export default function useSearch({search}:SearchProps){
    const [results,setResults] = useState<MediaItem[]>([])
    const [loading,setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        const timer = setTimeout(async ()=>{
            const query = search.trim();

            if( !query){
                setResults([])
                return;
            }

            setLoading(true)
            setError(null)

            try{
                const [artists,tracks]= await Promise.all([
                    getArtists(query),
                    getTracks(query)
                ])

                setResults([...artists,...tracks])
            }catch{
                setResults([])
                setError("Something went wrong while searching.");
            }finally{
                setLoading(false)
            }
        },300)

        return ()=> clearTimeout(timer)
    },[search])

    return {results,loading,error}
}