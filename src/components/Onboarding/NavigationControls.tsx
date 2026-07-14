import { ArrowRight, Check } from "lucide-react"
import useOnboarding from "../../hooks/useOnboarding"



export default function NavigationControls(){
    const {
        step,setStep,canContinue,
        saving,handleContinue,
    } = useOnboarding()
    return(
        <div className="flex w-full items-center justify-between">
            {step === "artists" && (
              <button
                onClick={() => setStep("genres")}
                className="text-sm text-muted-foreground transition hover:text-foreground"
              >
                ← Back
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
              {saving ? ("Saving...") : step === "genres" ? (
                <>
                  Continue <ArrowRight size={18} />
                </>
              ) : (
                <>
                  Get Started <Check size={18} />
                </>
              )}
            </button>
        </div>
    )
}