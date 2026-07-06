import { useState } from "react";
import type { AuthError } from "firebase/auth";
import { SoundWave } from "../components/SoundWave";
import Input from "../components/Input";
import { FcGoogle } from "react-icons/fc";
import LoadingPage from "../components/LoadingPage";
import getAuthErrorMessage from "../utils/authErrors";
import useAuth from "../hooks/useAuth";

export default function Auth() {
    const { login,register, loginWithGoogle } = useAuth();

    const [isLogin, setIsLogin] = useState(true);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isLoginMessage = isLogin ? "Criar Conta" : "Entrar"

    if (loading) return <LoadingPage/>


    async function handleAuthAction(action:()=>Promise<void>){
        setError("");
        setLoading(true);

        try {
            await action();
        } catch (err) {
            setError(getAuthErrorMessage(err as AuthError));
        } finally {
            setLoading(false);
        }
    }
    async function handleSubmit(e:React.FormEvent){
        e.preventDefault();

        await handleAuthAction(()=> 
            isLogin ? login(email, password) : register(email, password)
        )
    }

    async function handleGoogleLogin() {
        await handleAuthAction(()=>loginWithGoogle())
    }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 bg-background">
      <div
        className="w-full max-w-md border p-8 shadow-2xl backdrop-blur-xl bg-card border-border rounded-lg"
      >

        <div className="relative mb-10 flex flex-col items-center">
          <div
            className="absolute h-32 w-32 rounded-full blur-3xl"
          />

          <div className="relative">
            <SoundWave />
          </div>

          <h1 className="mt-6 text-5xl font-bold tracking-tight">
            Wave<span className="text-primary">len</span>
          </h1>

          <p className="mt-3 max-w-xs text-center text-sm text-muted-foreground">
            Descubra a música perfeita para qualquer momento.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
            <Input
                label="Email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                label="Senha"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

          {error && (
            <div
              className="rounded-lg border p-3 text-sm text-destructive"
              style={{
                borderColor: "rgba(239,68,68,.2)",
                background: "rgba(239,68,68,.08)",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-semibold transition-all hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            style={{
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              borderRadius: "var(--radius)",
            }}
          >
            {isLoginMessage}
          </button>
        </form>

        {/* Divider */}
        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-sm text-muted-foreground">ou</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 py-3 bg-primary boder-border rounded-lg 
            transition hover:brightness-110 disabled:opacity-60"
        >
            <FcGoogle size={24}/>

          <span className="font-medium text-foreground">
            Continuar com Google
          </span>
        </button>
        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
            Não possui uma conta?{" "}
            <button
                type="button"
                onClick={() => {
                  setIsLogin(isLogin ? false : true);
                  setError("");
                }}
                className="font-semibold text-primary transition hover:opacity-80"
            >
                {isLoginMessage} 
            </button>
        </div>
      </div>
    </main>
  );
}