export type AuthActionProps= "login" | "google" | "register" | null

type MusicalProfile ={
    artists?:MediaItem[],
    genres?:string[],
}
export interface User{
    uid?:string,
    name?:string,
    email?:string,
    photo?:string,
    onboardingCompleted?:boolean,
    musicalProfile?:MusicalProfile
}