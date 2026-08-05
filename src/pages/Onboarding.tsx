import SoundWave from "../components/ui/SoundWave";
import {MoveLeft} from "lucide-react";
import SearchInput from "../components/SearchInput";
import ProgressBar from "../components/onboarding/ProgressBar";
import useOnboarding from "../hook/useOnboarding";
import SelectionGrid from "../components/onboarding/SelectionGrid";
import NavigateButton from "../components/onboarding/NavigateButton";

export default function Onboarding(){
    const {
        search,setSearch,
        step,MINSELECTED,
        selectedLength,handleBack
    } = useOnboarding()
    const back= step == "artist"


 
    return(
        <main className="flex flex-col w-full h-screen md:px-40">
            <div className="absolute flex top-5 left-5">
                <button 
                    onClick={handleBack}
                    disabled={!back}
                    className={`flex py-3 px-5 rounded-3xl items-center justify-center gap-2 transition-colors duration-100 ${back ? "bg-primary hover:bg-primary/10" : "bg-card text-border cursor-auto"}`}>
                    <MoveLeft size={20}/>

                </button>
            </div>
            <div className="flex w-full items-center justify-center py-10">
                <div className="flex p-2 items-center justify-center border border-card rounded-2xl bg-primary">
                    <SoundWave barStyle="bg-background text-lg" />
                </div>
            </div>

            <div className="flex flex-col justify-center items-center text-center gap-5 p-10">
                <h1 className="text-5xl">What do you love listening to?</h1>
                <p className=" md:px-[20%]">Choose a few music genres and artists so Wavelen can personalize your recommendations.</p>
            </div>

            <ProgressBar step={step}/>

            <div className="flex p-5">
                <SearchInput
                    placeholder={step === "genre" ? "search genres..." : "search artists..."}
                    search={search}
                    setSearch={setSearch}
                />
            </div>

            <div className="flex flex-col py-1 px-5 md:px-0">
                <div className="flex w-full px-3 justify-between">
                    <p className="text-sm font-light text-foreground">{selectedLength} / {MINSELECTED} selecteds</p>
                    <p className="text-sm">Select at least 3</p>
                </div>
            </div>

            <div className="flex px-10 pt-10 md:px-0">
                <SelectionGrid/>
            </div>

            <NavigateButton/>
        </main>
    )
}