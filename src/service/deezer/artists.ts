import buildDeezerUrl from "../../lib/deezer"
import type { ArtistResponse } from "../../types/deezer"
import { dedupeByName, mapArtistItem, normalize } from "../../utils/deezer"

async function fetchArtists(name: string): Promise<MediaItem[]> {
    const artistUrl = buildDeezerUrl({ q: name }, 'artist')
    const response = await fetch(artistUrl)

    if (!response.ok) return []

    const data: ArtistResponse = await response.json()
    if (!data.data || data.data.length == 0) return []

    return data.data.map(mapArtistItem)
}

async function getExactArtist(name: string): Promise<MediaItem | null> {
    try {
        const results = await fetchArtists(name)
        const exact = results.filter(
            (artist) => normalize(artist.name) == normalize(name)
        )
        return dedupeByName(exact)[0] || null
    } catch{
        throw new Error("Failed to fetch artists.")
    }
}

export async function getArtists(name: string) {
    try {
        const results = await fetchArtists(name)
        const query = normalize(name)

        const exactMatches = results.filter(
            (artist) => normalize(artist.name) === query
        )

        if (exactMatches.length > 0) {
            return dedupeByName(exactMatches)
        }

        const partialMatches = results.filter((artist) =>
            normalize(artist.name).includes(query)
        )

        return dedupeByName(partialMatches)
    } catch{
        throw new Error("Failed to fetch artists.")
    }
}


const POPULARARTISTS = ["The Weeknd", "Billie Eilish", "Ariana Grande", "Lady Gaga", "Beyoncé", "Bruno Mars"]
export async function getPopularArtists() {
    try {
        const artists = POPULARARTISTS.map(getExactArtist)
        const result = await Promise.all(artists)
        return result.filter(Boolean) as MediaItem[]
    } catch{
        throw new Error("Failed to fetch popular artists.")
    }
}


