import SoundWave from "../components/ui/SoundWave";

export default function LoadingPage(){
    return(
        <main className="flex w-full h-screen items-center justify-center">
            <div className="py-8 px-7 border rounded-xl bg-primary border-card">
                <SoundWave barStyle="bg-background"/>
            </div>

        </main>
    )
}