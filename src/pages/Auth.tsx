import {useState,} from "react";
import { FcGoogle } from "react-icons/fc";
import Separator from "../components/auth/Separator";
import AuthInput from "../components/auth/AuthInput";
import SoundWave from "../components/ui/SoundWave";
import useAuth from "../hook/useAuth";


export default function Auth() {
  const {loginWithEmailPassword,authWithGoogle,register,loading,error} = useAuth()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [name,setName] = useState("")
  const [isLogin,setIsLogin]=useState(true)
  const [authAction,setAuthAction]=useState< AuthActionProps | null>(null)

  const authTitle= isLogin ? "Login" : "Create Account"
  const authToggleLabel = isLogin ? "Create Account" : "Sign In";

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (isLogin) {
          setAuthAction("login")
          loginWithEmailPassword(email,password);
      } else {
          setAuthAction("register")
          register(name,email,password);
      }
  }

  const handleGoogle=()=>{
    setAuthAction("google")
    authWithGoogle()
  }

  const resetInputValues=()=>{
    setIsLogin(!isLogin)
    setName("")
    setEmail("")
    setPassword("")
  }

  return(
    <main className="flex min-h-screen items-center p-4 justify-center">
      <div className="flex flex-col w-full max-w-md items-center justify-center p-10 bg-card rounded-lg gap-3 border border-border">
        <div className="flex rounded-3xl ">
          <div className="flex items-center justify-center p-4 rounded-full shadow-inner border border-primary">
              <SoundWave barStyle="bg-primary"/>
          </div>
        </div>
        <div className="flex flex-col text-center gap-3 py-5">
          <h1 className="text-5xl font-bold tracking-tight">Wave<span className="text-primary">len</span></h1>
          <p className="text-base font-light">Discover the perfect soundtrack for every moment.</p>
        </div>
        <Separator label={authTitle}/>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full ">

            {!isLogin && (
                <AuthInput
                    label="Name"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    placeholder="Enter your name"
                />
            )}

            <AuthInput
                label="Email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                type="email"
                placeholder="you@gmail.com"
                required
            />

            <AuthInput
                label="Password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                type="password"
                placeholder="******"
                required
            />

            <div className="flex py-5">
                <button 
                type="submit"
                disabled={loading}
                className="flex justify-center w-full p-3 font-bold text-xl tracking-tight text-foreground bg-primary rounded-lg hover:bg-primary/70 transition-colors">
                {
                  loading && (authAction == "login" || authAction == "register") 
                  ? <SoundWave barStyle="bg-foreground"/> :authTitle
                }
                </button>
            </div>
            {error && (
              <div className="flex justify-center">
                <p className="text-destructive tracking-tight">{error}</p>
              </div>
            )}
        </form>
        <Separator label="OR"/>

        <div className="flex w-full py-5">
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="flex items-center justify-center w-full p-3 gap-3 font-bold text-xl tracking-tight text-primary-foreground bg-white rounded-lg hover:bg-white/70 transition-colors  "
          >
            <FcGoogle/>
            {loading && authAction == "google" ? <SoundWave barStyle="bg-card"/> : "Continue with Google"}
          </button>
        </div>

        <div className="flex w-full items-center justify-center font-light text-subtitle-foreground ">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={resetInputValues}
            disabled={loading}
            className="text-primary hover:text-primary/70 transition-colors"
           >
            {authToggleLabel}
          </button>
        </div>
      </div>
    </main>
  )
}


