import buildDeezerUrl from "../../lib/deezer"
import type {
  DeezerArtist,DeezerArtistRaw,
  DeezerArtistSearchResponse,DeezerSearchResponse,
  DeezerTrack,DeezerTrackRaw,
} from "../../types/deezer"


// Normalize Deezer track response
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

// Check Deezer placeholder image
function isDeezerPlaceholder(url: string | null): boolean {
  if (!url) return true

  return url.includes(
    "d41d8cd98f00b204e9800998ecf8427e"
  )
}

// Normalize Deezer artist response
function normalizeDeezerArtist(raw: DeezerArtistRaw): DeezerArtist {
  return {
    id: raw.id,
    name: raw.name,
    picture_xl: isDeezerPlaceholder(raw.picture_xl)
      ? null
      : raw.picture_xl ?? null,
  }
}

// Generic Deezer fetch
async function fetchDeezer<T>(params: Record<string, string>,endpoint: DeezerEndpoint): Promise<T> {
  const url = buildDeezerUrl(params, endpoint)

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(
      `Deezer request failed: ${response.status}`
    )
  }

  return response.json() as Promise<T>
}

// Search tracks
export async function searchDeezerTracks(query: string,limit = 10): Promise<DeezerTrack[]> {
  const data = await fetchDeezer<DeezerSearchResponse>(
    {
      q: query,
      limit: String(limit),
    },
    "search"
  )
  const tracks = data.data?.slice(0, limit) ?? []
  return tracks.map(normalizeDeezerTrack)
}

// Search artists
export async function searchDeezerArtists(query: string,limit = 9): Promise<DeezerArtist[]> {
  const data =
    await fetchDeezer<DeezerArtistSearchResponse>(
      {
        q: query,
        limit: String(limit),
      },
      "artist"
    )

  const artists = data.data ?? []

  return artists.map(normalizeDeezerArtist)
}