import { cn } from "../../utils/cn"

interface AudioSpectrumProps {
    bars?:number
    active?:boolean
    className?:string 
    barClassName?:string
}

export function AudioSpectrum({ 
    bars = 5, active = true, className, barClassName 
}: AudioSpectrumProps) {

  const config = Array.from({ length: bars }, (_, i) => {
    const distanceFromCenter = Math.abs(i - (bars - 1) / 2)
    return {
      delay: `${i * 0.12}s`,
      duration: `${0.9 + (i % 3) * 0.25}s`,
      maxHeight: `${100 - distanceFromCenter * 14}%`,
    }
  })

  return (
    <div className={cn("flex items-center justify-center gap-0.75", className)} aria-hidden="true">
      {config.map((c, i) => (
        <span
          key={i}
          className={cn("w-0.75 rounded-full bg-current", barClassName)}
          style={{
            height: c.maxHeight,
            transformOrigin: "center",
            animationName: active ? "muse-bar" : undefined,
            animationDuration: c.duration,
            animationDelay: c.delay,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            transform: active ? undefined : "scaleY(0.4)",
            transition: "transform 0.3s ease",
          }}
        />
      ))}
    </div>
  )
}
