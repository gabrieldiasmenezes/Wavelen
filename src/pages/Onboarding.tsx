import { ArrowRight, Check } from "lucide-react"
import Header from "../components/Onboarding/Header"
import SearchInput from "../components/Onboarding/SearchInput"
import Card from "../components/Onboarding/Card"
import { useOnboarding } from "../hooks/useOnboarding"

export default function Onboarding() {
  const {
    step,setStep,
    current,itemsToShow,
    canContinue,saving,
    handleCardClick,handleContinue,
    MIN_SELECTION,
    } = useOnboarding()

  return (
    <main className="flex min-h-screen justify-center bg-background px-6 py-10">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col items-center gap-8">

          <Header title={current.title} subtitle={current.subtitle} />

          <div className="w-full max-w-2xl">
            <div className="mb-2 flex justify-between text-sm text-muted-foreground">
              <span>{current.step}</span>
              <span>{current.progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${current.progress}%` }}
              />
            </div>
          </div>

          <SearchInput
            value={current.search}
            onChange={current.setSearch}
            placeholder={current.placeholder}
          />

          <div className="flex w-full justify-between text-sm">
            <span className="text-foreground">
              {current.chosen.length}/{MIN_SELECTION} selecionados
            </span>
            <span className="text-muted-foreground">
              Selecione no mínimo {MIN_SELECTION}
            </span>
          </div>

          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {itemsToShow.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                name={item.name}
                photo={item.photo}
                selected={current.chosen.includes(item.id)}
                onClick={() => handleCardClick(item.id)}
              />
            ))}
          </div>

          <div className="flex w-full items-center justify-between">
            {step === "artists" && (
              <button
                onClick={() => setStep("genres")}
                className="text-sm text-muted-foreground transition hover:text-foreground"
              >
                ← Voltar
              </button>
            )}

            <button
              disabled={!canContinue || saving}
              onClick={handleContinue}
              className={`ml-auto flex items-center gap-2 rounded-xl px-8 py-3 font-semibold transition-all ${
                canContinue && !saving
                  ? "bg-primary text-primary-foreground hover:scale-105"
                  : "cursor-not-allowed bg-secondary text-muted-foreground"
              }`}
            >
              {saving ? (
                "Salvando..."
              ) : step === "genres" ? (
                <> Continuar <ArrowRight size={18} /> </>
              ) : (
                <> Começar <Check size={18} /> </>
              )}
            </button>
          </div>

        </div>
      </div>
    </main>
  )
}