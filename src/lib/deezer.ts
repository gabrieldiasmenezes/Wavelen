const BASE_URL="/api/deezer"


type DeezerEndpoint = "artist" | "search"
export default function buildDeezerUrl(params: Record<string,string>,endpoint:DeezerEndpoint): string {

  const query = new URLSearchParams(params)

  return `${BASE_URL}/${endpoint}?${query}`

}