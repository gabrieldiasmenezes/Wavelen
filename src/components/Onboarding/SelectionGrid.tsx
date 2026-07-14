import useOnboarding from "../../hooks/useOnboarding"
import Card from "./Card"

const DEFAULT_IMAGE = "/default.jpg"

export default function SelectionGrid(){
    const {
    current,itemsToShow,
    loadingArtists,error,
    handleCardClick
    } = useOnboarding()

    return(
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 min-h-105">
            {loadingArtists ? (
                Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="h-40 rounded-xl bg-secondary animate-pulse"
                />
                ))
            ) : error ? (
                <div className="col-span-3 flex flex-col items-center justify-center gap-3 py-12">
                <p className="text-sm text-destructive">{error}</p>
                <button
                    onClick={() => handleCardClick("")}
                    className="text-sm text-primary underline hover:opacity-80"
                >
                    Try again
                </button>
                </div>
            ) : itemsToShow.length === 0 ? (
                <div className="col-span-3 flex items-center justify-center py-12">
                <p className="text-sm text-muted-foreground">No results found.</p>
                </div>
            ) : (
                itemsToShow.map((item) => (
                <Card
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    photo={item.photo ?? DEFAULT_IMAGE}
                    selected={current.chosen.includes(item.id)}
                    onClick={() => handleCardClick(item.id)}
                />
                ))
            )}
        </div>
    )
}