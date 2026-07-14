import { searchLastFmTracks } from "./apis/lastFm"
import { searchDeezerArtists, searchDeezerTracks } from "./apis/deezer"


const POPULAR_ARTISTS = [
  "Taylor Swift",
  "The Weeknd",
  "Billie Eilish",
  "Drake",
  "Ariana Grande",
  "Ed Sheeran",
  "Beyoncé",
  "Bruno Mars",
  "Coldplay",
]


function mapArtistToCard(artist: {
  id: number
  name: string
  picture_xl: string | null
}): CardItem {

  return {
    id: String(artist.id),
    name: artist.name,
    photo: artist.picture_xl,
  }
}


// Search tracks combining Deezer preview + Last.fm metadata
export async function searchMusic(
  query: string,
  limit = 10
): Promise<MusicTrack[]> {

  const [
    deezerTracks,
    lastFmTracks,
  ] = await Promise.all([
    searchDeezerTracks(query, limit),
    searchLastFmTracks(query, limit),
  ])


  return deezerTracks.map((track) => {

    const metadata =
      lastFmTracks.find((last) =>
        last.name
          .toLowerCase()
          .includes(track.name.toLowerCase())
      )


    return {
      id: String(track.id),
      name: track.name,
      artist: track.artist,
      album: track.album,
      cover: track.cover,
      previewUrl: track.previewUrl,
      tags: metadata?.tags ?? [],
    }

  })
}


// Search artists from Deezer
export async function searchArtists(
  query: string,
  limit = 9
): Promise<CardItem[]> {

  const artists =
    await searchDeezerArtists(query, limit)


  return artists.map(mapArtistToCard)
}


// Initial onboarding artists
export async function getPopularArtists(): Promise<CardItem[]> {

  const results =
    await Promise.all(
      POPULAR_ARTISTS.map((artist) =>
        searchDeezerArtists(artist, 1)
      )
    )


  return results
    .flat()
    .map(mapArtistToCard)
}