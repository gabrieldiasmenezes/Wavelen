export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="w-full max-w-2xl text-center space-y-10">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
          🚧 Currently in Development
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Wavelen
          </h1>

          <p className="text-lg text-muted-foreground md:text-xl">
            A new way to discover music through intelligent recommendations.
          </p>
        </div>

        {/* Card */}
        <div className="flex flex-col items-center space-y-4 rounded-2xl border border-border bg-card p-6 text-left md:p-8">
          <h2 className="text-xl font-semibold text-card-foreground">
            Project Status
          </h2>

          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✔️ Frontend foundation built with Vite + React</li>
            <li>✔️ Dark & Light theme support</li>
            <li>🚧 Authentication in progress</li>
            <li>🚧 AI-powered recommendation engine</li>
          </ul>
        </div>

        {/* Footer */}
        <p className="pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Wavelen. Currently under active development.
        </p>

      </div>
    </main>
  )
}