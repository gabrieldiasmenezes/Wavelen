import {searchLastFmTracks} from "./apis/lastFm"

import {searchDeezerTracks} from "./apis/deezer"

export async function searchMusic(query: string,limit = 10): Promise<MusicTrack[]> {

  const [deezerTracks,lastFmTracks] = await Promise.all([
    searchDeezerTracks(query,limit),
    searchLastFmTracks(query,limit)
  ])


  return deezerTracks.map(track => {
    const metadata =
      lastFmTracks.find(last =>
          last.name.toLowerCase().includes(
              track.name.toLowerCase())
      )


    return {
      id: String(track.id),
      name: track.name,
      artist: track.artist,
      album: track.album,
      cover: track.cover,
      previewUrl: track.previewUrl,
      tags:metadata?.tags ?? []
    }

  })

}