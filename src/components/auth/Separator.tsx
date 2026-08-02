export default function Separator({label}:LabelProps){
  return(
    <div className="flex items-center gap-3 w-full">
      <div className="grow border-t border-subtitle-foreground"></div>
      <p className="font-light">{label}</p>
      <div className="grow border-t border-subtitle-foreground"></div>
    </div>
  )
}