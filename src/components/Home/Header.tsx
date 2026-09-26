import { useState } from "react";
import SoundWave from "../ui/SoundWave";
import SearchInput from "../SearchInput";
import useAuth from "../../hook/useAuth";
import SearchResults from "./SearchResults";
import DropDown from "./Dropdown";

export default function Header(){
    const {user}=useAuth()
    const [search,setSearch]=useState("")
    const [dropdown,setDropdown]= useState(false)
    const isSearched=search.trim() !== ""

    return(
        <>
            <div className="flex justify-between items-center w-full  px-5 py-3 gap-6">
                <div className="flex shrink-0 items-center gap-2">
                    <h2 className="hidden tracking-tight font-bold md:block">Wave<span className="text-primary">len</span></h2>
                    <div className="flex items-center gap-3 bg-primary rounded-full px-8 py-2 md:hidden">
                        <SoundWave 
                            barStyle="bg-background"
                            className="w-10 h-5 gap-1"
                            lengthBars={7}
                        />
                    </div>
                </div>
                <div className="relative hidden w-full md:block ">
                    <SearchInput
                        placeholder="What do you want to listen today"
                        search={search}
                        setSearch={setSearch}
                    />
                    {isSearched && <SearchResults search={search}/> }
                </div>

                <div className="hidden items-center gap-3 bg-primary rounded-full px-4 py-2 md:flex">
                    <SoundWave 
                        barStyle="bg-background"
                        className="w-7 h-5 gap-1"
                        lengthBars={5}
                    />
                    <h3 className=" hidden text-background tracking-tight lg:block ">Assistant</h3>
                </div>
                
                <button onClick={()=>setDropdown(!dropdown)} className="h-10 w-10 shrink-0 overflow-hidden rounded-full transition hover:scale-105">
                    <img
                        src={user?.photo ?? "default.jpg"}
                        alt="Account"
                        className="h-full w-full object-cover"
                    />
                </button>

                
            </div>
            {dropdown && <DropDown/>}
        </>

    )
}