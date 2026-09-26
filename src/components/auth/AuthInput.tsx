import type { ComponentPropsWithoutRef } from "react"

interface InputProps extends ComponentPropsWithoutRef<"input"> ,LabelProps {}

export default function AuthInput({label,...input}:InputProps){
  return(
    <div className="flex flex-col gap-1">
      <p className="text-foreground font-semibold">{label}</p>
      <input
        className=" p-2 rounded-sm bg-input"
        {...input}
      />
    </div>
  )
}