import buildDeezerUrl from "../../lib/deezer"

import type {DeezerSearchResponse,DeezerTrack,DeezerTrackRaw,} from "../../types/deezer"


// Normalize Deezer API response into application format
function normalizeDeezerTrack(raw: DeezerTrackRaw): DeezerTrack {
  return {
    id: raw.id,
    name: raw.title,
    artist: raw.artist?.name ?? "",
    album: raw.album?.title ?? "",
    cover: raw.album?.cover_xl ?? null,
    previewUrl: raw.preview ?? null,
  }
}

// Generic Deezer API fetch
async function fetchDeezer<T>(params: Record<string, string>): Promise<T> {

  const url = buildDeezerUrl(params)

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(
      `Deezer request failed: ${response.status}`
    )
  }

  return response.json() as Promise<T>
}

// Search tracks by query
export async function searchDeezerTracks(query: string,limit = 10): Promise<DeezerTrack[]> {

  const data = await fetchDeezer<DeezerSearchResponse>({
    q: query,
    limit: String(limit),
  })

  const tracks = data.data?.slice(0, limit) ?? []

  return tracks.map(normalizeDeezerTrack)
}