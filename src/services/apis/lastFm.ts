import buildLastFMUrl from "../../lib/lastFm"
import type {
  LastFmArtistTagsResponse,LastFmImage,
  LastFmSimilarArtistsResponse,LastFmTopTracksResponse,
  LastFmTrack,LastFmTrackInfoResponse,
  LastFmTrackRaw,LastFmTrackSearchResponse,
} from "../../types/lastFm"

// Extract best available cover image
function extractCover(images: LastFmImage[]): string | null {

  const order = ["extralarge","large","medium","small",]

  for (const size of order) {

    const image = images.find(
      (img) => img.size === size && img["#text"]
    )

    if (image) return image["#text"] 
  }

  return null
}

// Normalize Last.fm response
function normalizeLastFmTrack(raw: LastFmTrackRaw): LastFmTrack {

  const artist = typeof raw.artist === "string"
      ? raw.artist
      : raw.artist?.name ?? ""

  return {
    name: raw.name ?? "",
    artist,
    album: raw.album?.title ?? "",
    cover: extractCover(raw.image ?? []),
    url: raw.url ?? "",
    tags:raw.toptags?.tag?.map((tag) => tag.name) ?? [],
  }
}

// Generic Last.fm fetch
async function fetchLastFm<T>(params: Record<string,string>): Promise<T> {

  const url = buildLastFMUrl(params)

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(
      `Last.fm request failed: ${response.status}`
    )
  }

  return response.json() as Promise<T>
}



// Search tracks
export async function searchLastFmTracks(query:string,limit = 10): Promise<LastFmTrack[]> {

  const data = await fetchLastFm<LastFmTrackSearchResponse>({
    method:"track.search",
    track:query,
    limit:String(limit),
  })

  const tracks =data.results?.trackmatches ?.track ?? []

  return tracks.map(normalizeLastFmTrack)
}

// Top artist tracks
export async function getTopTracksByArtist(artist:string,limit = 5): Promise<LastFmTrack[]> {

  const data = await fetchLastFm<LastFmTopTracksResponse>({
    method:"artist.gettoptracks",
    artist,
    limit:String(limit),
  })

  const tracks = data.toptracks?.track ?? []

  return tracks.map(normalizeLastFmTrack)
}

// Similar artists tracks
export async function getSimilarTracksByArtist(artist:string,limit= 10): Promise<LastFmTrack[]> {

  const data = await fetchLastFm<LastFmSimilarArtistsResponse>({
    method:"artist.getsimilar",
    artist,
    limit:String(limit),
  })

  const similar = data.similarartists?.artist ?? []

  const tracks = await Promise.all(
    similar.slice(0,3).map((artist) =>
      getTopTracksByArtist(artist.name,3)
    )
  )

  return tracks.flat().slice(0,limit)
}

// Artist genres/tags
export async function getArtistTags(artist:string): Promise<string[]> {

  const data =await fetchLastFm<LastFmArtistTagsResponse>({
    method:"artist.gettoptags",
    artist,
  })


  return (data.toptags?.tag ?.slice(0,5).map(tag => tag.name) ?? [])
}

// Full track information
export async function getTrackInfo(track:string,artist:string): Promise<LastFmTrack | null> {

  const data =await fetchLastFm<LastFmTrackInfoResponse>({
    method:"track.getInfo",
    track,
    artist,
  })

  if (!data.track) return null
  
  return normalizeLastFmTrack(data.track)
}