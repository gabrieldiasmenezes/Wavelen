import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { AudioSpectrum } from "../../ui/AudioSpectrum";
import AssistantButton from "./AssistantButton";
import Search from "./Search";
import DropDown from "./DropDown";


export default function Header() {
    const {user} = useAuth()
    const [dropdown,setDropdown]=useState(false)

    return (
        <header className="flex items-center justify-between gap-10 px-4 py-4 md:px-6">

            {/* Logo */}
            <div className="flex shrink-0 items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <AudioSpectrum
                        bars={4}
                        className="h-4 w-5"
                    />
                </div>

                <h1 className="hidden md:block font-heading text-lg font-bold tracking-tight">
                    Wave<span className="text-primary">len</span>
                </h1>
            </div>

            {/* Search */}
            <div className="hidden w-full md:block">
                <Search/>
            </div>

            {/* Assistant */}
            <AssistantButton />

            {/* Profile */}
            <button onClick={()=> setDropdown(!dropdown)} className="h-10 w-10 shrink-0 overflow-hidden rounded-full transition hover:scale-105">
                <img
                    src={user?.photoURL ?? "default.jpg"}
                    alt="Account"
                    className="h-full w-full object-cover"
                />
            </button>
            {dropdown && <DropDown/>}


        </header>
    );
}