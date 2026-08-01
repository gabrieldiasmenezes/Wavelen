
import { useState } from "react";
import { SavedButton } from "./SavedButton";
import { Play } from "lucide-react";

type ArtistCardProps={
    artist:TrackItem
}
export default function ArtistCard({artist}:ArtistCardProps){
    const [saved,setSaved]=useState(false)
    return(
        <button className="flex group justify-between gap-3 px-5 py-2 rounded-sm hover:bg-secondary transition-all">
            <div className="relative">
                <img
                    src={artist.photo ?? "default.jpg"}
                    alt={artist.name}
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
                <h1 className="text-xl">{artist.name}</h1>
            </div>
            <button onClick={()=>setSaved(!saved)} ><SavedButton active={saved}/></button>

        </button>
            
    )
}