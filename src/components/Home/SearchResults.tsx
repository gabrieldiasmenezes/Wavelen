import MediaCard from "../ui/MediaCard";
import useSearch from "../../hook/useSearch";


type MessageResultsProps= LabelProps & {
    labelColor?:string
}

function MessageResult({label,labelColor="muted-foreground"}:MessageResultsProps){
    return(
        <div className={`py-6 text-center text-sm text-${labelColor} animate-pulse`}>
            {label}
        </div>
    )
}


export default function SearchResults({search}:SearchProps){
    const {results,loading,error}=useSearch({search})

    return(
        <div className="flex group flex-col absolute left-0 top-full z-50 mt-2 px-7 py-5 max-h-125 w-full gap-3 overflow-y-auto rounded-2xl bg-card shadow-xl scrollbar-hide">
            {error && (
                <MessageResult label={error} labelColor="accent"/>
            )}

            {loading && (
                <MessageResult label="Searching..."/>
            )}

            {!loading && results.length === 0 && search.trim() !== "" && (
                <MessageResult 
                    label="No results found for &quot;{search}&quot;."
                />
            )}
            {results.map((m)=>(
                <MediaCard item={m}/>
            ))}

        </div>
    )
}