import { HomeIcon, Library, Search, Sparkles, type LucideIcon } from "lucide-react";


type NavBarProps={
    icon: LucideIcon,
    label:string,
    isSelected?:boolean
}

function NavItem({icon,label,isSelected}:NavBarProps){
    const Icon=icon;
    return(
        <button onClick={()=>!isSelected} className="flex flex-col items-center justify-center gap-1">
            <Icon/>
            <p className="text-sm">{label}</p>
        </button>
    )

}


export default function MobileBar(){
    const NavItems:NavBarProps[]=[
        {
            icon:HomeIcon,
            label:"Home",
            isSelected:false
        },
        {
            icon:Search,
            label:"Search",
            isSelected:false
        },
        {
            icon:Library,
            label:"Library",
            isSelected:false
        },
        {
            icon:Sparkles,
            label:"IA",
            isSelected:false
        },
    ]
    return(
        <div className="block absolute w-full bottom-0 left-0 right-0 py-7 px-7 rounded-lg bg-card md:hidden">
            <div className="flex justify-between items-center">
                {NavItems.map((item)=>(
                    <NavItem
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        isSelected={item.isSelected}
                    />
                ))}
            </div>

        </div>
    )
}