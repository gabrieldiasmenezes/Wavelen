import type { DeezerArtist, DeezerTrack } from "../types/deezer"

export function mapArtistItem(media:DeezerArtist) : MediaItem{
    
    return{
        name: media.name,
        photo: media.picture_xl,
        url: media.link
    }
}

export function mapTrackItem(media:DeezerTrack) : MediaItem{
    return{
        name: media.title,
        artist:media.artist.name ?? "",
        photo: media.album.cover_xl ?? "",
        url: media.link
    }
}

export function normalize(value:string):string {
    return value.toLowerCase().normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "").trim()
}

export function dedupeByName(artists: MediaItem[]): MediaItem[] {
    const uniqueByName = new Map<string, MediaItem>()
    for (const artist of artists) {
        const key = normalize(artist.name)
        const existing = uniqueByName.get(key)
        if (!existing || (!existing.photo && artist.photo)) {
            uniqueByName.set(key, artist)
        }
    }
    return Array.from(uniqueByName.values())
}
