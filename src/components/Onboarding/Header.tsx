import { AudioLines } from "lucide-react"

interface HeaderProps {
    title:string,
    subtitle:string
}

export default function Header({title,subtitle}:HeaderProps){
    return(
        <>
          <div className="flex items-center gap-3 rounded-full border border-border bg-card/60 px-4 py-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <AudioLines className="h-4 w-4" />
              </span>

              <span className="font-display text-sm font-semibold tracking-tight">
                Wavelen
              </span>
            </div>

            <div className="space-y-3 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                {title}
              </h1>

              <p className="max-w-lg text-muted-foreground">
                {subtitle}
              </p>
          </div>
        </>
    )
}