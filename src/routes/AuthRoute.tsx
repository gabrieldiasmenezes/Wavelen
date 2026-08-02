import Auth from "../pages/Auth";
import Home from "../pages/Home";
import useAuth from "../hook/useAuth";
import LoadingPage from "../pages/LoadingPage";

export default function AuthGate(){
    const {user,loading}=useAuth()
    if (loading) return <LoadingPage/>
    if(!user) return <Auth/>
    return <Home/>

}