import {Library } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { useEffect,useState } from "react";
import { searchArtists } from "../../services/music";
import LibraryCard from "./LibraryCard";

export default function SideBar(){
  const {userData}=useAuth()
  const artistsNames=userData?.musicProfile?.artists
  const [artists,setArtists]=useState<TrackItem[]>([])

  useEffect(()=>{
    async function loadArtists(){
      if (!artistsNames) return
      const result = await Promise.all(
        artistsNames.map((artist)=>(
          searchArtists(artist,1)
        ))
      )

      setArtists(result.flat())
    }
    loadArtists()
  },[userData])

  const playlists=[
    {
      name:"Recommendations",
      photo:"default.jpg",
      isPlaylist:true
    },
    {
      name:"Saved",
      photo:"saved.jpg",
      isPlaylist:true
    },
    {
      name:"Liked",
      photo:"liked.jpg",
      isPlaylist:true
    },
    {
      name:"History",
      photo:"history.jpg",
      isPlaylist:true
    }
  ]
    return(
      <div className="hidden md:block w-66 h-screen bg-card rounded-lg">
        <div className="flex p-3 gap-1 items-center justify-start">
          <Library className="fill-muted-foreground text-muted-foreground w-5" />
          <p className="text-lg font-light text-muted-foreground">Your Library</p>
        </div>
        <div className="flex flex-col gap-5">
          {playlists.map((card)=>(
            <LibraryCard
              key={card.name}
              name={card.name}
              photo={card.photo}
            />
          ))}

          {artists.map((artist)=>(
            <LibraryCard
              key={artist.name}
              name={artist.name}
              photo={artist.photo}
            />
          ))}
        </div>
      </div>
    )
}