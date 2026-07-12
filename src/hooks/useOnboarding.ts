import { useMemo, useState } from "react"
import { musicGenres } from "../data/musicGender"
import { mockArtists } from "../data/musicArtist"
import { completeOnboarding } from "../services/userService"
import useAuth from "./useAuth"

export type Step = "genres" | "artists"

const MIN_SELECTION = 3

export function useOnboarding() {
  const { user } = useAuth()

  const [step, setStep] = useState<Step>("genres")
  const [genreSearch, setGenreSearch] = useState("")
  const [artistSearch, setArtistSearch] = useState("")
  const [chosenGenres, setChosenGenres] = useState<string[]>([])
  const [chosenArtists, setChosenArtists] = useState<string[]>([])
  const [saving, setSaving] = useState(false)

  const config = {
    genres: {
      title: "What do you love listening to?",
      subtitle:
        "Choose a few music genres so Wavelen can personalize your recommendations.",
      placeholder: "Search genres...",
      search: genreSearch,
      setSearch: setGenreSearch,
      chosen: chosenGenres,
      progress: 50,
      step: "Step 1 of 2",
    },

    artists: {
      title: "Who are your favorite artists?",
      subtitle:
        "Pick a few artists you enjoy to make your recommendations even more personal.",
      placeholder: "Search artists...",
      search: artistSearch,
      setSearch: setArtistSearch,
      chosen: chosenArtists,
      progress: 100,
      step: "Step 2 of 2",
    },
  }

  const current = config[step]

  const itemsToShow = useMemo(() => {
    if (step === "genres") {
      if (!genreSearch.trim()) return musicGenres.slice(0, 6)
      return musicGenres.filter((g) =>
        g.name.toLowerCase().includes(genreSearch.toLowerCase())
      )
    }

    if (!artistSearch.trim()) return mockArtists.slice(0, 6)
    return mockArtists.filter(
      (a) =>
        a.name.toLowerCase().includes(artistSearch.toLowerCase()) ||
        a.genre.toLowerCase().includes(artistSearch.toLowerCase())
    )
  }, [step, genreSearch, artistSearch])

  const toggleSelection = (
    id: string,chosen: string[],
    setChosen: (v: string[]) => void
  ) => {
    setChosen(
      chosen.includes(id)
        ? chosen.filter((i) => i !== id)
        : [...chosen, id]
    )
  }

  const handleCardClick = (id: string) => {
    if (step === "genres") toggleSelection(id, chosenGenres, setChosenGenres)
    else toggleSelection(id, chosenArtists, setChosenArtists)
  }

  const canContinue = current.chosen.length >= MIN_SELECTION

  const handleContinue = async () => {
    if (step === "genres") {
      setStep("artists")
      return
    }

    if (!user) return
    setSaving(true)
    try{
      await completeOnboarding(user.uid, {
        genres: chosenGenres,
        artists: chosenArtists,
      })

    } finally{
      setSaving(false)
    }

  }

  return {
    step,setStep,current,
    itemsToShow,canContinue,
    saving,handleCardClick,
    handleContinue,MIN_SELECTION,
  }
}