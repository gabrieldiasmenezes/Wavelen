import { Home, Library, Search, Sparkles, type LucideIcon } from "lucide-react";

type NavItens={
    icon:LucideIcon,
    text:string
}
function NavItens({icon,text}:NavItens){
    const Icon=icon
    return(
        <div className="flex flex-col justify-center items-center gap-1">
            <Icon/>
            <p className="text-sm">{text}</p>
        </div>
    )
}
export default function MobileBar(){
    return(
        <div className="absolute w-full bottom-0 left-0 right-0 py-7 bg-card block md:hidden">
            <div className="flex justify-between px-10">
                <NavItens icon={Home} text="Home"/>
                <NavItens icon={Search} text="Search"/>
                <NavItens icon={Library} text="Library"/>
                <NavItens icon={Sparkles} text="IA"/>

            </div>

        </div>
    )
}