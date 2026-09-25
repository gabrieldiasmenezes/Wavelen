import useAuth from "../../hook/useAuth"

type ButtonProps=LabelProps & {
    onClick?:()=> void
    className?:string
}
function Button({label,onClick,className="hover:bg-secondary"}:ButtonProps){
    return(
        <button 
            onClick={onClick}
            className={`rounded-lg px-4 py-3 text-left ${className} transition-colors ease-out`}
        >
            {label}
        </button>
    )
}
export default function DropDown(){
    const {logout}=useAuth()

    return(
        <div className="flex absolute right-5 top-12 z-50 w-72 rounded-2xl bg-card shadow-lg">
            <div className="flex flex-col p-2 w-full  gap-3">
                <Button
                    label="Account"
                />
                <Button
                    label="Musical Profile"
                />
                <Button
                    label="Logout"
                    onClick={logout}
                    className="hover:bg-accent"
                />
            </div>
        </div>

    )
}