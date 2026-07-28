import { AudioSpectrum } from "../../ui/AudioSpectrum";

export default function AssistantButton(){
    return(
        <button
            className="
            group relative hidden shrink-0 items-center gap-2
            overflow-hidden rounded-full
            bg-primary px-4 py-2.5
            font-semibold text-primary-foreground
            shadow-lg shadow-primary/30
            transition-transform hover:scale-105
            sm:flex
            "
        >
            <span
            className="pointer-events-none absolute inset-0 rounded-full bg-primary"
            style={{
                animation: "muse-pulse-ring 2.4s ease-out infinite",
            }}
            />

            <span
            className="pointer-events-none absolute inset-0 rounded-full bg-primary"
            style={{
                animation: "muse-pulse-ring 2.4s ease-out infinite",
                animationDelay: "1.2s",
            }}
            />

            <span className="relative flex items-center gap-2">
            <AudioSpectrum bars={5} className="h-4 w-6" />
            <span className="hidden lg:inline">Assistent</span>
            </span>
        </button>
    )
}