import React, { useState } from "react"
import SavedButton from "./SavedButton"
import { Play } from "lucide-react"
import HeartButton from "./HeartButton"

type MediaCardProps={
    item:MediaItem

}

export default function MediaCard({item}:MediaCardProps){
    const [imageIsLoading,setImageIsLoading]=useState(false)
    const [isActive,setIsActive]=useState(false)
    const loadImageStyle=imageIsLoading ? "opacity-100 scale-100" : "opacity-0 scale-95"
    const handleClick=(e:React.MouseEvent)=>{
        e.preventDefault()
        e.stopPropagation()
        setIsActive(!isActive)
    }
    return(
        <a 
            className="flex p-2 gap-5 items-center justify-between rounded-lg hover:bg-secondary transition-colors ease-out "
        >

            <div className="relative">
                    {!imageIsLoading && (
                    <div className="bg-card animate-pulse"></div>
                ) }
                <img 
                    src={item.photo ?? "default.jpg"} 
                    loading="lazy"
                    onLoad={()=>setImageIsLoading(true)}
                    className={`w-30 rounded-sm object-cover transition-all duration-300 ease-out  will-change-transform ${loadImageStyle}`} alt="" 
                />
                <div className="flex absolute inset-0 rounded-sm items-center justify-center bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity ease-out  ">
                    <Play className="fill-foreground text-foreground"/>
                </div>


            </div>

            <div className="flex flex-col w-full text-start">
                <h2 className="text-xl">{item.name}</h2>
                <p className="text-sm">{item.artist ? item.artist : "Artist"}</p>
            </div>
            {item.artist ?(
                <HeartButton
                    isActive={isActive}
                    onClick={handleClick}
                />
            ):(
                <SavedButton
                    isActive={isActive}
                    onClick={handleClick}
                />                
            )
            }

        </a>
    )
}