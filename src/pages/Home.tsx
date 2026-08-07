import Header from "../components/Home/Header";
import MobileBar from "../components/Home/MobileBar";

export default function Home(){
    return(
        <main className="flex w-full border">
            <Header/>
            <MobileBar/>
        </main>
    )
}