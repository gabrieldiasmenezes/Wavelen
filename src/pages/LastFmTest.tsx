import { useEffect, useState } from "react"
import { searchTracks } from "../services/lastFm"
import useAuth from "../hooks/useAuth"


export default function LastFmTest(){
  const {userData} = useAuth()
  const [tracks,setTracks] = useState<LastFmTrack[]>([])
  const artist = userData?.musicProfile?.artists[0]


  useEffect(() => {
    if (!artist) return

    async function load() {
      const result = await searchTracks(artist)

      setTracks(result)
    }

    load()

  }, [artist])


  return (
    <main className="p-10">

      <h1 className="text-3xl font-bold mb-5">
        Last.fm Test
      </h1>


      <div className="grid gap-5">

        {tracks.map(track=>(
          <div key={track.url}>

            {track.cover && (
              <img
                src={track.cover}
                className="w-32 rounded"
              />
            )}

            <p>{track.name}</p>
            <p>{track.artist}</p>
            <p>{track.album}</p>

          </div>
        ))}

      </div>

    </main>
  )
}