
const BASE_URL="/api/deezer"

type DeezerEndpoint = "search" | "artist"

export default function buildDeezerUrl(params: Record<string,string>,endpoint:DeezerEndpoint): string {

  const query = new URLSearchParams(params)

  return `${BASE_URL}/${endpoint}?${query}`

}

export async function getArtists(name:string){
    try{
        const artistUrl = buildDeezerUrl({ q: name }, 'artist')
        const response= await fetch(artistUrl)

        if (!response.ok) return 

        const data= await response.json()
        if (!data.data || data.data.lenght == 0) return

        const artists = data.data.map((item: any) => ({
            name: item.name,
            photo: item.picture_xl,
            url: item.link
        }))
        return artists
        
    }catch(e){
        throw new Error("Erro:",e)
    }
}

export async function getPopularArtists(){
    try{
        const popularArtists = ["The Weeknd","Billie Eilish","Ariana Grande","Lady Gaga","Beyoncé","Bruno Mars",]
        const artists=popularArtists.map(async(name)=>{
            const result= await getArtists(name)
            return result[0] || null
        })
        const result= await Promise.all(artists)
        return result.filter(Boolean)
    }catch(e){
        throw new Error("Erro:",e)
    }

}