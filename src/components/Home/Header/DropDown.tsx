import useAuth from "../../../hooks/useAuth";


interface ButtonProps{
    content:string,
    onClick?:()=>void
}
function Button({content,onClick}:ButtonProps){
    return(
        <button 
        onClick={onClick}
        className="rounded-lg px-4 py-3 text-left transition hover:bg-secondary">
            {content}
        </button>
    )
}
export default function DropDown() {
    const {logout} = useAuth()

    return (
        <div className="absolute right-0 top-12 z-50 w-72 rounded-2xl border bg-card shadow-xl">

            {/* Options */}
            <div className="flex flex-col p-2">
                <Button content="Account"/>
                <Button content="Musical Profile"/>
                <Button content="Logout" onClick={logout}/>

            </div>
        </div>

    );
}