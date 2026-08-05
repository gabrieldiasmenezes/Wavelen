import { Check, MoveRight } from "lucide-react"
import type { ReactNode } from "react"
import useOnboarding from "../../hook/useOnboarding"
import SoundWave from "../ui/SoundWave"

export default function NavigateButton() {
    const { step, canContinue, isSaving, handleContinue } = useOnboarding()
    const disabled = !canContinue || isSaving
    const buttonClass = disabled
        ? "bg-card text-border cursor-not-allowed"
        : "bg-primary hover:bg-primary/10"

    let content: ReactNode

    if (step !== "artist") {
        content = (
            <>
                Continue
                <MoveRight size={20} />
            </>
        )
    } else if (isSaving) {
        content = <SoundWave barStyle="bg-background text-lg" />
    } else {
        content = (
            <>
                Finish
                <Check size={20} />
            </>
        )
    }

    return (
        <div className="fixed flex bottom-5 right-5">
            <button
                onClick={handleContinue}
                disabled={disabled}
                className={`flex py-3 px-20 rounded-3xl items-center justify-center gap-2 transition-all ease-out duration-300 ${buttonClass}`}
            >
                {content}
            </button>
        </div>
    )
}