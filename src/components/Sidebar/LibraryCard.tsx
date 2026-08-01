import { Dot } from "lucide-react"

type LibraryCardProps={
  name:string,
  photo?:string | undefined,
  isPlaylist?:boolean


}
export default function LibraryCard({name,photo,isPlaylist=false}:LibraryCardProps){
  return(
      <button className={`flex items-center ${isPlaylist ? "rounded-lg" : "rounded-3xl"} gap-3 cursor-pointer p-2 hover:bg-secondary transition-colors`}>
        <img src={photo ?? "default.jpg"} alt="Capa da Playlist" className="w-15 h-12 rounded-lg object-cover" />
        <div>
          <h1 className="text-lg font-bold">{name}</h1>
          <div className="flex items-center text-sm">
            {isPlaylist ? (
              <>
                <p>Playlist</p> 
                <Dot className="fill-muted-foreground text-muted-foreground"/>
                <p>Wavelen</p>
              </>
            ) : (
              <p>Artist</p>
            )}
          </div>
        </div>
      </button>
  )
}
