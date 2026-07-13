import buildLastFMUrl from "../lib/lastFm"
import type {
  LastFmArtistTagsResponse,LastFmImage,
  LastFmSimilarArtistsResponse,LastFmTopTracksResponse,
  LastFmTrackInfoResponse,LastFmTrackRaw,
  LastFmTrackSearchResponse,} from "../types/lastFm"

// Extracts the best available cover image from Last.fm image array
function extractCover(images: LastFmImage[]): string {
  const order = ["extralarge", "large", "medium", "small"]

  for (const size of order) {
    const found = images.find(
      (img) => img.size === size && img["#text"] 
    )

    if (found) return found["#text"]
  }

  return ""
}

// Normalizes a raw Last.fm track object into LastFmTrack
function normalizeTrack(raw: LastFmTrackRaw): LastFmTrack {
  const artist =
    typeof raw.artist === "string"
      ? raw.artist
      : raw.artist?.name ?? ""

  const images = raw.image ?? []

  const tags = raw.toptags?.tag.map((tag) => tag.name) ?? []

  return {
    name: raw.name ?? "",
    artist,
    album: raw.album?.title ?? "",
    cover: extractCover(images),
    url: raw.url ?? "",
    tags,
  }
}

async function fetchLastFm<T>(params: Record<string, string>): Promise<T> {
  const url = buildLastFMUrl(params)

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Last.fm request failed: ${response.status}`)
  }

  return response.json() as Promise<T>
}

// Searches tracks by query string
export async function searchTracks(query: string,limit = 10): Promise<LastFmTrack[]> {

  const data = await fetchLastFm<LastFmTrackSearchResponse>({
    method: "track.search",
    track: query,
    limit: String(limit),
  })

  const results = data.results?.trackmatches?.track ?? []

  return results.map(normalizeTrack)
}

// Returns top tracks for a given artist
export async function getTopTracksByArtist(artist: string,limit = 5): Promise<LastFmTrack[]> {

  const data = await fetchLastFm<LastFmTopTracksResponse>({
    method: "artist.gettoptracks",
    artist,
    limit: String(limit),
  })

  const tracks = data.toptracks?.track ?? []

  return tracks.map(normalizeTrack)
}

// Returns tracks from artists similar to a given artist
export async function getSimilarTracksByArtist(artist: string,limit = 10): Promise<LastFmTrack[]> {

  const data = await fetchLastFm<LastFmSimilarArtistsResponse>({
    method: "artist.getsimilar",
    artist,
    limit: String(limit),
  })

  const similar = data.similarartists?.artist ?? []

  const trackLists = await Promise.all(
    similar
      .slice(0, 3)
      .map((artist) => getTopTracksByArtist(artist.name, 3))
  )

  return trackLists.flat()
}

// Returns genre tags for a given artist
export async function getArtistTags(artist: string): Promise<string[]> {

  const data = await fetchLastFm<LastFmArtistTagsResponse>({
    method: "artist.gettoptags",
    artist,
  })

  const tags = data.toptags?.tag ?? []

  return tags.slice(0, 5).map((tag) => tag.name)
}

// Returns full track info including album cover and tags
export async function getTrackInfo(track: string,artist: string): Promise<LastFmTrack | null> {

  const data = await fetchLastFm<LastFmTrackInfoResponse>({
    method: "track.getInfo",
    track,
    artist,
  })

  if (!data.track) return null

  return normalizeTrack(data.track)
}