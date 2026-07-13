import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import { searchMusic } from "../services/music"


export default function MusicTest(){

  const { userData } = useAuth()

  const [tracks,setTracks] = useState<MusicTrack[]>([])

  const artist = userData?.musicProfile?.artists[0]


  useEffect(() => {

    if(!artist) return


    async function load(){

      const result = await searchMusic('Bell Marques')
      console.log(result[0])

      setTracks(result)

    }


    load()

  },[artist])


  return (
    <main className="p-10">

      <h1 className="text-3xl font-bold mb-5">
        Deezer Test
      </h1>


      <div className="grid gap-5">

        {tracks.map(track => (

          <div key={track.id}>

            {track.cover && (
              <img
                src={track.cover}
                className="w-32 rounded"
              />
            )}

            <p>{track.name}</p>
            <p>{track.artist}</p>
            <p>{track.album}</p>


            {track.previewUrl ? (
              <audio
                controls
                src={track.previewUrl}
              />
            ) : (
              <p>
                Preview unavailable
              </p>
            )}

          </div>

        ))}

      </div>

    </main>
  )
}