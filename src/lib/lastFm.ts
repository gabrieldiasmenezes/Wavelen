const API_KEY = import.meta.env.VITE_LASTFM_API_KEY
const BASE_URL = 'https://ws.audioscrobbler.com/2.0'

export default function buildLastFMUrl(params: Record <string,string>):string {
    const query = new URLSearchParams({
        ...params,
        api_key:API_KEY,
        format:'json',
    })

    return `${BASE_URL}?${query}`
}

