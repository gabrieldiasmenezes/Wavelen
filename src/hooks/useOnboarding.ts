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
      title: "Descubra seu Caminho Musical",
      subtitle: "Escolha alguns gêneros musicais para que o Wavelen personalize suas recomendações.",
      placeholder: "Pesquisar gênero...",
      search: genreSearch,
      setSearch: setGenreSearch,
      chosen: chosenGenres,
      progress: 50,
      step: "Passo 1 de 2",
    },
    artists: {
      title: "Seus Artistas Favoritos",
      subtitle: "Selecione artistas que você curte para afinarmos ainda mais suas recomendações.",
      placeholder: "Pesquisar artista...",
      search: artistSearch,
      setSearch: setArtistSearch,
      chosen: chosenArtists,
      progress: 100,
      step: "Passo 2 de 2",
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

  const toggle = (
    id: string,
    chosen: string[],
    setChosen: (v: string[]) => void
  ) => {
    setChosen(
      chosen.includes(id)
        ? chosen.filter((i) => i !== id)
        : [...chosen, id]
    )
  }

  const handleCardClick = (id: string) => {
    if (step === "genres") toggle(id, chosenGenres, setChosenGenres)
    else toggle(id, chosenArtists, setChosenArtists)
  }

  const canContinue = current.chosen.length >= MIN_SELECTION

  const handleContinue = async () => {
    if (step === "genres") {
      setStep("artists")
      return
    }

    if (!user) return
    setSaving(true)

    await completeOnboarding(user.uid, {
      genres: chosenGenres,
      artists: chosenArtists,
    })

    setSaving(false)
  }

  return {
    step,
    setStep,
    current,
    itemsToShow,
    canContinue,
    saving,
    handleCardClick,
    handleContinue,
    MIN_SELECTION,
  }
}