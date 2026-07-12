import { Search, X } from "lucide-react";

interface SearchInputProps {
    value:string,
    onChange:(value:string)=>void
    placeholder:string
}

export default function SearchInput({value,onChange,placeholder}:SearchInputProps){
    return(
        <>
            <div className="relative w-full">
                <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                />

                <input
                type="search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-2xl border border-border bg-background py-3 pl-11 pr-10 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                />

                {value.length > 0 && (
                <button
                    type="button"
                    onClick={() => onChange("")}
                    className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                    aria-label="Limpar pesquisa"
                >
                    <X className="h-4 w-4" />
                </button>
                )}
            </div>
        
        </>
    )
}