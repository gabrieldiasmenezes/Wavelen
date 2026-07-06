import type { ComponentPropsWithoutRef } from "react"


interface InputProps extends ComponentPropsWithoutRef<"input"> {
    label:string
}
export default function Input({label,...input}:InputProps){
    return(
        <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              {label}
            </label>

            <input
                className="w-full px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none transition-all focus:ring-2 bg-input border-border rounded-lg"
                {...input}
            />
        </div>
    )
}