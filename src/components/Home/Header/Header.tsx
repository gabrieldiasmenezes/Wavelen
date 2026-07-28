import { AudioSpectrum } from "../../ui/AudioSpectrum";
import AssistantButton from "./AssistantButton";
import Search from "./Search";

export default function Header() {

    return (
        <header className="flex items-center gap-10 px-4 py-4 md:px-6">

            {/* Logo */}
            <div className="flex shrink-0 items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <AudioSpectrum
                        bars={4}
                        className="h-4 w-5"
                    />
                </div>

                <h1 className="font-heading text-lg font-bold tracking-tight">
                    Wave<span className="text-primary">len</span>
                </h1>
            </div>

            {/* Search */}
            <Search/>

            {/* Assistant */}
            <AssistantButton />

            {/* Profile */}
            <button className="h-10 w-10 shrink-0 overflow-hidden rounded-full transition hover:scale-105">
                <img
                    src="/default.jpg"
                    alt="Account"
                    className="h-full w-full object-cover"
                />
            </button>

        </header>
    );
}