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
    tag: LastFmTag[]
  }
}

export type LastFmTrackSearchResponse = {
  results?: {
    trackmatches?: {
      track?: LastFmTrackRaw[]
    }
  }
}

export type LastFmTopTracksResponse = {
  toptracks?: {
    track?: LastFmTrackRaw[]
  }
}

export type LastFmSimilarArtistsResponse = {
  similarartists?: {
    artist?: {
      name: string
    }[]
  }
}

export type LastFmArtistTagsResponse = {
  toptags?: {
    tag?: LastFmTag[]
  }
}

export type LastFmTrackInfoResponse = {
  track?: LastFmTrackRaw
}