import useAuth from "../hook/useAuth"

export default function Home(){
    const {user}=useAuth()
    const message= user == null ? "veio nulo pai" : user
    console.log(message)
    return(
        <h1>
            deu certo
        </h1>
    )
}