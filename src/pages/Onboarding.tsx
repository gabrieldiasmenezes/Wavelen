import { useEffect, useMemo, useState } from "react";
import SoundWave from "../components/ui/SoundWave";
import { MoveRight, Search } from "lucide-react";
import { musicGenres } from "../data/musicGenre";
import { getArtists, getPopularArtists } from "../service/deezer";

const MINSELECTED=3
type Step="genre" | "artist"
export default function Onboarding(){

    const [search,setSearch]=useState("")
    const [selectedGenrers,setSelectedGenrers]=useState<string[]>([])
    const [artists,setArtists]=useState<MediaItem[]>([])
    const [popular,setPopular]=useState<MediaItem[]>([])
    const [selectedArtists,setSelectedArtists]=useState<MediaItem[]>([])
    const [step,setStep]=useState<Step>("genre")
    const [currentProgress,setCurrentProgress]=useState(50);

    const canContinue= step == "genre" ? selectedGenrers.length >= MINSELECTED : selectedArtists.length >= MINSELECTED

    const searchResults=useMemo(()=>{
        if(step == "genre") {
            return musicGenres.filter((genrer)=> genrer.name.toLowerCase().includes(search.toLowerCase()))
        }
        return []
    },[search])
    
    const genresToShow= search === "" 
        ? (searchResults?.slice(0, 6) ?? []) 
        : (searchResults ?? []);

    useEffect(()=>{
        const fetchArtist= async ()=>{
            const popular= await getPopularArtists()
            setPopular(popular)
            setArtists(popular)
        }
        fetchArtist()
    },[])

    useEffect(()=>{
        if(step !== "artist") return

        if(search.trim() == ""){
            setArtists(popular)
            return
        }


        const timer=setTimeout(async () => {
            const searchResults = await getArtists(search)
            setArtists(searchResults.slice(0,6))
        },300)

        return ()=> clearTimeout(timer)
    },[search,step,popular])
    
    useEffect(()=>{
        const timer=setTimeout(()=>{
            setCurrentProgress(Math.min(100,Math.max(0,currentProgress)))
        },100)
        return ()=>clearTimeout(timer);
    },[])

    const handleSelectGenre=(name:string)=>{
        if(selectedGenrers.includes(name)){
            const newList=selectedGenrers.filter((item)=>item !== name)
            setSelectedGenrers(newList)
        }else{
            setSelectedGenrers([...selectedGenrers,name])
        }

    }

    const handleSelectArtist=(artist:MediaItem)=>{

        if(selectedArtists.includes(artist)){
            const newList=selectedArtists.filter((item)=>item !== artist)
            setSelectedArtists(newList)
        }else{
            setSelectedArtists([...selectedArtists,artist])
        }
    }


    const handleContinue=()=>{
        if(canContinue){
            setSearch("")
            setStep("artist")
            setCurrentProgress(100)
            
        }
    }
    return(
        <main className="flex flex-col w-full h-screen md:px-40">
            
            <div className="flex w-full items-center justify-center py-10">
                <div className="flex p-2 items-center justify-center border border-card rounded-2xl bg-primary">
                    <SoundWave barStyle="bg-background text-lg" />
                </div>
            </div>

            <div className="flex flex-col justify-center items-center text-center gap-5 p-10">
                <h1 className="text-5xl">What do you love listening to?</h1>
                <p className=" md:px-[20%]">Choose a few music genres and artists so Wavelen can personalize your recommendations.</p>
            </div>

            <div className="flex flex-col px-10 gap-2 md:px-20 ">
                <div className="flex w-full px-3 justify-between">
                    <p className="text-sm font-semibold">Step {step == "genre" ? 1 : 2} of 2</p>
                    <p className="text-sm font-semibold">{currentProgress}%</p>
                </div>
                <div className="flex w-full bg-card border border-border rounded-full h-4">
                    <div 
                    className="bg-primary h-full rounded-full transition-all duration-1000 ease-out"
                    style={{width:`${currentProgress}%`}}
                    />
                </div>
            </div>

            <div className="flex p-5">
                <div className="flex gap-3 w-full rounded-full px-5 py-3 border border-input">
                    <Search/>
                    <input 
                        type="text"
                        placeholder={step === "genre" ? "search genres..." : "search artists..."}
                        className="flex w-full"
                        value={search}
                        onChange={(e)=> setSearch(e.target.value)}
                     />
                </div>

            </div>

            <div className="flex flex-col py-1 px-5 md:px-0">
                <div className="flex w-full px-3 justify-between">
                    <p className="text-sm font-light text-foreground">{selectedGenrers.length} / {MINSELECTED} selecteds</p>
                    <p className="text-sm">Select at least 3</p>
                </div>
            </div>

            <div className="flex px-10 pt-10 md:px-0">
                <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-50">

                    {step == "genre" && genresToShow.map((genre)=>{
                        const selected=selectedGenrers.includes(genre.name)
                        
                        return(
                            <button 
                            key={genre.name}
                                onClick={()=>handleSelectGenre(genre.name)}
                                className={`group relative w-full overflow-hidden rounded-3xl transition-all duration-300 cursor-pointer ${selected ? "border-3 border-primary":""}`}
                            >
                                <img 
                                    src={genre.photo ?? "default.jpg"}
                                    loading="lazy" 
                                    className="absolute inset-0 h-full w-full object-cover transition-transform ease-out duration-200 group-hover:scale-110 will-change-transform" 
                                    alt="" 
                                />

                                <div className={`absolute inset-0 w-full h-full ${selected ? "bg-background/60" : "bg-background/40"} `}/>
                                
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <h1>{genre.name}</h1>
                                </div>
                            </button>
                        )
                    })}

                    {step == "artist" && artists.map((artist)=>{
                        const selected=selectedArtists.includes(artist)
                        
                        return(
                            <button 
                            key={artist.name}
                                onClick={()=>handleSelectArtist(artist)}
                                className={`group relative w-full overflow-hidden rounded-3xl transition-all duration-300 cursor-pointer ${selected ? "border-3 border-primary":""}`}
                            >
                                <img 
                                    src={artist.photo ?? "default.jpg"}
                                    loading="lazy" 
                                    className="absolute inset-0 h-full w-full object-cover transition-transform ease-out duration-200 group-hover:scale-110 will-change-transform" 
                                    alt="" 
                                />

                                <div className={`absolute inset-0 w-full h-full ${selected ? "bg-background/60" : "bg-background/40"} `}/>
                                
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <h1>{artist.name}</h1>
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="fixed flex bottom-5 right-5">
                <button 
                    onClick={handleContinue}
                    disabled={!canContinue}
                    className={`flex py-3 px-20 rounded-3xl items-center justify-center gap-2 transition-colors duration-100 ${canContinue ? "bg-primary hover:bg-primary/10" : "bg-card text-border cursor-auto"}`}>
                    Continuar
                    <MoveRight size={20}/>

                </button>
            </div>
        </main>
    )
}