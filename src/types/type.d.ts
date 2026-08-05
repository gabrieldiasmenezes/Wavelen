type AuthActionProps= "login" | "google" | "register" | null

type LabelProps={
    label:string
}

//API
interface DeezerMedia{
    name?: string
    title?:string
    picture_xl: string
    link: string
}
interface DeezerResponse{
    data:DeezerMedia[]
}

type DeezerMediaType = 'artist' | 'album' | 'track' | 'playlist'

//Components

type MediaItem ={
    id?:string
    name?:string,
    photo?:string,
    url?:string
}
type MusicalProfile ={
    artists?:MediaItem[],
    genres?:string[],
}
interface User{
    uid?:string,
    name?:string,
    email?:string,
    photo?:string,
    onboardingCompleted?:boolean,
    musicProfile?:MusicalProfile
}

type Step="genre" | "artist"