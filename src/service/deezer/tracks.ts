import buildDeezerUrl from "../../lib/deezer";
import type { TrackResponse } from "../../types/deezer";
import { dedupeByName, mapTrackItem} from "../../utils/deezer";

async function fetchTracks(name:string):Promise<MediaItem[]> {
    const artistUrl=buildDeezerUrl({q:name},"search")
    const response= await fetch(artistUrl)

    if(!response.ok) return []

    const data:TrackResponse= await response.json()
    if (!data.data || data.data.length == 0) return []
    console.log(data.data)
    return data.data.map(mapTrackItem)
}

export async function getTracks(name:string){
    try{
        const results= await fetchTracks(name)
        if (!results || results.length === 0) return []
        return dedupeByName(results)
    }catch{
        throw new Error("Failed to fetch artists.")
    }
}