
import { useState } from "react";
import { SavedButton } from "./SavedButton";
import { LikedButton } from "./LikedButton";
import { Play } from "lucide-react";

type MusicCardProps={
    track:MusicTrack 
}
export default function MusicCard({track}:MusicCardProps){
    const [liked,setLiked]=useState(false)
    const [saved,setSaved]=useState(false)
    return(
        <a href="https://open.spotify.com/search/lady%20gaga" className="flex group justify-between gap-3 px-5 py-2 rounded-sm hover:bg-secondary transition-all">
            <div className="relative">
                <img
                    src={track.cover ?? "default.jpg"}
                    alt={track.name}
                    className="w-20 rounded-sm"
                />

                <div
                    className="
                        absolute inset-0
                        flex items-center justify-center
                        rounded-sm
                        opacity-0
                        group-hover:opacity-100
                        transition-opacity duration-300
                    "
                >
                    <Play className="w-8 h-8 fill-foreground text-foreground" />
                </div>
            </div>
            <div className="flex flex-col w-full items-start">
                <h1 className="text-xl">{track.name}</h1>
                <p className="text-sm">{track.artist}</p>
            </div>
            <button onClick={()=>setSaved(!saved)} ><SavedButton active={saved}/></button>
            <button 
                type="button" 
                onClick={()=> setLiked(!liked)}
                title={liked ? "Like" : "Unlike"}
            >
                <LikedButton active={liked}/>
            </button>

        </a>
            
    )
}