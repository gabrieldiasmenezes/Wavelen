import { useRef, useState } from "react";
import SearchBar from "../../ui/SearchBar";
import MusicCard from "../../Cards/MusicCard";
import { searchArtists, searchMusic } from "../../../services/music";
import ArtistCard from "../../Cards/ArtistCard";


type SearchResult =
    | {
        type:"track",
        data:MusicTrack
    }
    | {
        type:"artist",
        data:TrackItem
    }


export default function Search() {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    async function handleSearch(query: string) {
        const value = query.trim();

        if (!value) {
            setSearchResult([]);
            return;
        }

        try {
            setLoading(true);
            const musics = await searchMusic(value);
            const artists = await searchArtists(value);
            const results: SearchResult[] = [
                ...artists.map((artist)=>({
                    type:"artist" as const,
                    data:artist
                })),
                ...musics.map((music)=>({
                    type:"track" as const,
                    data:music
                })),
            ]
            console.log(results)
            setSearchResult(results);
        } catch (error) {
            console.error(error);
            setSearchResult([]);
        } finally {
            setLoading(false);
        }
    }

    const onChangeSearch = (value: string) => {
        setSearch(value);

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        if (!value.trim()) {
            setSearchResult([]);
            return;
        }

        debounceRef.current = setTimeout(() => {
            handleSearch(value);
        }, 500);
    };

    const showResults =
        search.trim().length > 0 &&
        (loading || searchResult.length > 0);

    return (
        <div className="relative mx-2 flex-1 w-full">
            <SearchBar
                value={search}
                onChange={onChangeSearch}
                placeholder="What do you want to listen to today?"
            />

            {showResults && (
                <div className="absolute left-0 top-full z-50 mt-2 max-h-125 w-full overflow-y-auto rounded-2xl bg-card shadow-xl scrollbar-hide">

                    {loading ? (
                        <div className="p-6 text-center text-sm text-muted-foreground">
                            Searching...
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2 p-4">
                            {searchResult.map((result) => {
                                if(result.type == "track"){
                                    return (
                                        <MusicCard
                                            key={result.data.id}
                                            track={result.data}
                                        />
                                    )
                                }
                                return (
                                    <ArtistCard
                                        key={result.data.id}
                                        artist={result.data}
                                    />
                                )
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>

    );
}