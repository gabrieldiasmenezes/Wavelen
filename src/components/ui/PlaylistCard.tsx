
import { useState } from "react";


type PlaylistCardProps={
    photo?:string,
    name?:string
}
export default function PlaylistCard({photo,name}:PlaylistCardProps){
    const [imageIsLoading,setImageIsLoading]=useState(false)
    const loadImageStyle=imageIsLoading ? "opacity-100 scale-100" : "opacity-0 scale-95"

    return(
        <div 
            className="flex p-2 gap-5 items-center justify-between rounded-lg hover:bg-secondary transition-colors ease-out cursor-pointer "
        >

            <div className="relative">
                    {!imageIsLoading && (
                    <div className="bg-card animate-pulse"></div>
                ) }
                <img 
                    src= {photo ?? "default.jpg"}
                    loading="eager"
                    onLoad={()=>setImageIsLoading(true)}
                    className={`w-30 rounded-sm object-cover transition-all duration-300 ease-out  will-change-transform ${loadImageStyle}`} alt="" 
                />

            </div>

            <div className="flex flex-col w-full text-start">
                <h2 className="text-xl">{name}</h2>
                <p className="text-sm">Playlist</p>
            </div>

        </div>
    )
}