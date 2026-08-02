type AuthActionProps= "login" | "google" | "register" | null

type LabelProps={
    label:string
}

type MediaItem ={
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