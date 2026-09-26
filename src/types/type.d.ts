type Step="genre" | "artist"

type SearchProps={
    search:string
}
type LabelProps={
    label:string
}

type MediaItem ={
    name:string,
    photo?:string,
    artist?:string,
    url?:string
}


type ActiveButtonProps={
    isActive:boolean,
    onClick:(e: React.MouseEvent<HTMLButtonElement>)=>void
}