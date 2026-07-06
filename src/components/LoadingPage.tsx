import { SoundWave } from "../components/SoundWave";

export default function LoadingPage() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center gap-8"
      style={{
        background:
          "radial-gradient(circle at center, rgba(56,189,248,.08), transparent 45%), var(--background)",
      }}
    >

      <div className="animate-pulse">
        <SoundWave />
      </div>


      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Wave<span className="text-primary">len</span>
        </h1>

        <p className="mt-3 text-sm text-muted-foreground">
          Preparando sua experiência musical...
        </p>
      </div>


      <div className="flex items-center gap-2">
        <span
          className="h-2 w-2 animate-bounce rounded-full bg-primary"
        />

        <span
          className="h-2 w-2 animate-bounce rounded-full bg-primary"
          style={{animationDelay: "0.15s",}}
        />

        <span
          className="h-2 w-2 animate-bounce rounded-full bg-primary"
          style={{animationDelay: "0.3s",}}
        />
      </div>
    </main>
  );
}