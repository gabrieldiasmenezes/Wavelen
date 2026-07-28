
import { useState } from "react";
import { SavedButton } from "./SavedButton";
import { LikedButton } from "./LikedButton";

type MusicCardProps={
    track:MusicTrack
}
export default function MusicCard({track}:MusicCardProps){
    const [liked,setLiked]=useState(false)
    const [saved,setSaved]=useState(false)
    return(
        <button className="flex justify-between gap-3 px-5 py-2 rounded-sm hover:bg-secondary transition-all">
            <img src={track.cover} alt="" className="w-20 rounded-sm"/>
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

        </button>
            
    )
}