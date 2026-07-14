import Header from "../components/Onboarding/Header"
import SearchInput from "../components/Onboarding/SearchInput"

import SelectionGrid from "../components/Onboarding/SelectionGrid"
import NavigationControls from "../components/Onboarding/NavigationControls"
import useOnboarding from "../hooks/useOnboarding"


export default function Onboarding() {
  const {current,MIN_SELECTION,} = useOnboarding()

  return (
    <main className="flex min-h-screen justify-center bg-background px-6 py-10">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col items-center gap-8">

          <Header
            title={current.title}
            subtitle={current.subtitle}
          />

          <div className="w-full max-w-2xl">
            <div className="mb-2 flex justify-between text-sm text-muted-foreground">

              <span> {current.step} </span>
              <span> {current.progress}% </span>

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
              {current.chosen.length}/{MIN_SELECTION} selected
            </span>

            <span className="text-muted-foreground">
              Select at least {MIN_SELECTION}
            </span>

          </div>
          <SelectionGrid/>
          <NavigationControls/>
        </div>
      </div>
    </main>
  )
}