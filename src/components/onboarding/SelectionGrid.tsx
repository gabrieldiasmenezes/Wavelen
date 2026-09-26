import useOnboarding from "../../hook/useOnboarding"
import SoundWave from "../ui/SoundWave"
import Card from "./Card"

export default function SelectionGrid(){
    const {
        itemsToShow,isLoading,
        isItemSelect,handleSelect,error
    } = useOnboarding()

    if (error){
        return (
            <div className="flex w-full items-center justify-center py-20">
                <div className="flex p-2 items-center justify-center border border-card rounded-2xl bg-primary">
                    <h1 className="text-red-700">Error in server</h1>
                </div>
            </div>
        )
        
    }
    if (isLoading){
        return (
            <div className="flex w-full items-center justify-center py-20">
                <div className="flex p-2 items-center justify-center border border-card rounded-2xl bg-primary">
                    <SoundWave barStyle="bg-background text-lg" />
                </div>
            </div>
        )
    }

    if(itemsToShow.length === 0){
        return(
            <div className="flex w-full items-center justify-center py-20">
                <div className="flex p-2 items-center justify-center border border-card rounded-2xl bg-primary">
                    <h1>No results for your search</h1>
                </div>
            </div>
        )
    }

    return(
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-50">
            {itemsToShow.map((item)=>
                <Card
                    key={item.name}
                    name={item.name}
                    photo={item.photo ?? ""}
                    isSelected={isItemSelect(item.name)}
                    onSelect={()=>handleSelect(item)}
                />
            )}
        </div>
    )

}