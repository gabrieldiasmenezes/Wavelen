import { useRef, useState } from "react";
import SearchBar from "../../ui/SearchBar";
import MusicCard from "../../MusicCard/MusicCard";
import { searchMusic } from "../../../services/music";

export default function Search() {
    const [search, setSearch] = useState("");
    const [musicList, setMusicList] = useState<MusicTrack[]>([]);
    const [loading, setLoading] = useState(false);

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    async function handleSearch(query: string) {
        const value = query.trim();

        if (!value) {
            setMusicList([]);
            return;
        }

        try {
            setLoading(true);

            const musics = await searchMusic(value);

            console.log(musics);

            setMusicList(musics);
        } catch (error) {
            console.error(error);
            setMusicList([]);
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
            setMusicList([]);
            return;
        }

        debounceRef.current = setTimeout(() => {
            handleSearch(value);
        }, 500);
    };

    const showResults =
        search.trim().length > 0 &&
        (loading || musicList.length > 0);

    return (
        <div className="relative mx-2 flex-1">
            <SearchBar
                value={search}
                onChange={onChangeSearch}
                placeholder="What do you want to listen to today?"
            />

            {showResults && (
                <div className="absolute left-0 top-full z-50 mt-2 max-h-125 w-full overflow-y-auto rounded-2xl border bg-card shadow-xl">

                    {loading ? (
                        <div className="p-6 text-center text-sm text-muted-foreground">
                            Searching...
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2 p-4">
                            {musicList.map((music) => (
                                <MusicCard
                                    key={music.id}
                                    track={music}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>

    );
}