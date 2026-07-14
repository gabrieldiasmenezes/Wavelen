import buildLastFMUrl from "../../lib/lastFm"
import type {
  LastFmImage,LastFmTrack,
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


