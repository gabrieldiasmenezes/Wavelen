export interface DeezerTrack {
  id: number
  name: string
  artist: string
  album: string
  cover: string | null
  previewUrl: string | null
}

export type DeezerArtist = {
  id: number
  name: string
  picture_xl: string | null
}

export interface DeezerAlbum {
  title: string
  cover_xl?: string
}

export interface DeezerTrackRaw {
  id: number
  title: string
  preview: string | null
  artist?: DeezerArtist
  album?: DeezerAlbum
}

export interface DeezerSearchResponse {
  data?: DeezerTrackRaw[]
  total?: number
}

export type DeezerArtistRaw = {
  id: number
  name: string
  picture_xl: string | null
}

export type DeezerArtistSearchResponse = {
  data?: DeezerArtistRaw[]
}