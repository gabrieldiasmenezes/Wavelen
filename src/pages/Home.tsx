export default function Home(){
    return(
        <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
            <div className="w-full max-w-2xl text-center space-y-10">
                <h1>Página Principal</h1>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-muted-foreground text-sm">
                🚧 Projeto em desenvolvimento
                </div>

                {/* Title */}
                <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Wavelen
                </h1>

                <p className="text-muted-foreground text-lg md:text-xl">
                    Uma nova experiência em recomendações inteligentes está sendo construída.
                </p>
                </div>

                {/* Card */}
                <div className="flex flex-col items-center bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4 text-left">
                <h2 className="text-xl font-semibold text-card-foreground">
                    Status do projeto
                </h2>

                <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>✔️ Base do frontend em Vite + React</li>
                    <li>✔️ Sistema de tema (dark/light)</li>
                    <li>🚧 Autenticação em desenvolvimento</li>
                    <li>🚧 Sistema de recomendações IA</li>
                </ul>
                </div>

                {/* Footer */}
                <p className="text-xs text-muted-foreground pt-6">
                Wavelen © {new Date().getFullYear()} — em construção ativa
                </p>
            </div>
        </main>
    )
}