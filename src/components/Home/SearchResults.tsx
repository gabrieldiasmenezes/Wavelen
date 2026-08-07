import MediaCard from "../ui/MediaCard";



export default function SearchResults(){
    const media=[
        {
            name:"Couldn't Make It Any Harder",
            photo:"default.jpg",
            artist:"Sabrina Carpenter",
            url:"xxx"
        },
        {
            name:"Sabrina Carpenter",
            photo:"default.jpg",
            url:"xxx"
        }
    ]

    return(
        <div className="flex group flex-col absolute left-0 top-full z-50 mt-2 px-7 py-5 max-h-125 w-full gap-3 overflow-y-auto rounded-2xl bg-card shadow-xl scrollbar-hide">
            {media.map((m)=>(
                <MediaCard
                    item={m}

                />
            ))}


        </div>
    )
}