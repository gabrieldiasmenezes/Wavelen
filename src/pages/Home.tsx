import useAuth from "../hook/useAuth"

export default function Home(){
    const {user}=useAuth()
    const message= user == null ? "veio nulo pai" : user
    console.log(message)
    return(
        <h1>
            {user == null ? "veio nulo pai" : "nao veio nulo irmão"}
        </h1>
    )
}