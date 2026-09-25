
import Header from "../components/Home/Header";
import MobileBar from "../components/Home/MobileBar";
import { Library } from "lucide-react";
import useAuth from "../hook/useAuth";
import MediaCard from "../components/ui/MediaCard";
import PlaylistCard from "../components/ui/PlaylistCard";


export default function Home(){
    const {user}=useAuth()

    return(
        <main className="flex flex-col w-full min-h-screen">
            <Header/>
            <MobileBar/>
            <aside className="flex w-full flex-1 px-3 gap-3">
                <div className="fixed hidden md:flex flex-col top-20 bottom-3 left-5 w-[320px] bg-card rounded-2xl ">
                    <div className="flex w-full gap-1  p-5">
                        <Library/>
                        <h3>Your Library</h3>
                    </div>
                    <div className="flex flex-col gap-3">
                        <PlaylistCard photo="liked.jpg" name="Liked Songs"/>
                        {
                            user?.musicalProfile?.artists?.map((artist)=>(
                                <MediaCard key={artist.name} item={artist} isSearch={false}/>
                            ))
                        }
                    </div>
                </div>
            </aside>
        </main>
    )
}