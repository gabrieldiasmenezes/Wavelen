import React, { useState } from "react"

type MediaCardProps={
    name:string,
    photo:string,
    isSelected:boolean,
    onSelect:()=>void,
}
function MediaCard({name,photo,isSelected,onSelect}:MediaCardProps){
    const[isLoaded,setisLoaded]=useState(false)
    return(
        <button 
            key={name}
            onClick={onSelect}
            className={`group relative w-full overflow-hidden rounded-3xl transition-all duration-300 cursor-pointer ${isSelected ? "border-3 border-primary":""}`}
        >
            {!isLoaded && (
                <div className="absolute inset-0 bg-card animate-pulse"></div>
            ) }
            <img 
                src={photo ?? "default.jpg"}
                loading="lazy" 
                onLoad={()=>setisLoaded(true)}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-300 ease-out group-hover:scale-110 will-change-transform ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                alt="Background Card" 
            />

            <div className={`absolute inset-0 w-full h-full ${isSelected ? "bg-background/60" : "bg-background/40"} `}/>
            
            <div className="absolute inset-0 flex items-center justify-center">
                <h1>{name}</h1>
            </div>
        </button>
    )
}

export default React.memo(MediaCard)