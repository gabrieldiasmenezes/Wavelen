import { Search } from "lucide-react"

type SearchProps={
    placeholder:string,
    search:string,
    setSearch:(s:string) => void
}
export default function SearchInput({placeholder,search,setSearch}:SearchProps){
    return(
        <div className="flex gap-3 w-full rounded-full px-5 py-3 border border-input">
            <Search/>
            <input 
                type="text"
                placeholder={placeholder}
                className="flex w-full"
                value={search}
                onChange={(e)=> setSearch(e.target.value)}
                />
        </div>
    )
}