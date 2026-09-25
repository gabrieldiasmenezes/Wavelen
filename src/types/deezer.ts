export interface DeezerArtist{
    name?: string
    title?:string
    picture_xl: string
    link?: string
}
export interface ArtistResponse{
    data:DeezerArtist[]
}
export interface DeezerTrack{
  title?:string,
  artist?:{
    name?:string
  }
  album?:{
    cover_xl:string
  }
  link?:string,
}

export interface TrackResponse{
  data:DeezerTrack[]
}


