export type LastFmTrack = {
  name: string
  artist: string
  album: string
  cover: string | null
  url: string
  tags: string[]
}

export type LastFmImage = {
  "#text": string
  size: string
}

export type LastFmArtistObject = {
  name: string
}

export type LastFmAlbum = {
  title: string
}

export type LastFmTag = {
  name: string
}

export type LastFmTrackRaw = {
  name?: string
  artist?: string | LastFmArtistObject
  album?: LastFmAlbum
  image?: LastFmImage[]
  url?: string

  toptags?: {
    tag?: LastFmTag[]
  }
}

export type LastFmTrackSearchResponse = {
  results?: {
    trackmatches?: {
      track?: LastFmTrackRaw[]
    }
  }
}
