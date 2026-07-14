import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { musicGenres } from "../../data/musicGender"
import { completeOnboarding } from "../../services/userService"
import { getPopularArtists, searchArtists } from "../../services/music"
import useAuth from "../../hooks/useAuth"
import { OnboardingContext } from "./onboardingContext"

type Step = "genres" | "artists"

const MIN_SELECTION = 3
const DEBOUNCE_MS = 500

interface OnboardingProviderProps {
  children: ReactNode
}

export function OnboardingProvider({ children }: OnboardingProviderProps) {
  const { user } = useAuth()

  const [step, setStep] = useState<Step>("genres")
  const [genreSearch, setGenreSearch] = useState("")
  const [artistSearch, setArtistSearch] = useState("")
  const [chosenGenres, setChosenGenres] = useState<string[]>([])
  const [chosenArtists, setChosenArtists] = useState<string[]>([])
  const [artistResults, setArtistResults] = useState<CardItem[]>([])
  const [saving, setSaving] = useState(false)
  const [loadingArtists, setLoadingArtists] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const fetchArtists = useCallback(async (query?: string) => {
    setLoadingArtists(true)
    setError(null)

    try {
      const artists = query
        ? await searchArtists(query)
        : await getPopularArtists()
      setArtistResults(artists)
    } catch {
      setArtistResults([])
      setError("Could not load artists. Please try again.")
    } finally {
      setLoadingArtists(false)
    }
  }, [])

  // Loads popular artists when entering the artist step
  useEffect(() => {
    if (step !== "artists") return
    if (artistResults.length === 0) fetchArtists()
  }, [step, artistResults.length, fetchArtists])

  // Searches artists with debounce
  useEffect(() => {
    if (step !== "artists") return

    if (debounceRef.current) clearTimeout(debounceRef.current)

    const query = artistSearch.trim()
    if (!query) return

    debounceRef.current = setTimeout(() => {
      fetchArtists(query)
    }, DEBOUNCE_MS)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [artistSearch, step, fetchArtists])

  const config = {
    genres: {
      title: "What do you love listening to?",
      subtitle: "Choose a few music genres so Wavelen can personalize your recommendations.",
      placeholder: "Search genres...",
      search: genreSearch,
      setSearch: setGenreSearch,
      chosen: chosenGenres,
      progress: 50,
      step: "Step 1 of 2",
    },
    artists: {
      title: "Who are your favorite artists?",
      subtitle: "Pick a few artists you enjoy to make your recommendations even more personal.",
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
      if (!genreSearch.trim()) return musicGenres.slice(0, 9)
      return musicGenres.filter((genre) =>
        genre.name.toLowerCase().includes(genreSearch.toLowerCase())
      )
    }
    return artistResults
  }, [step, genreSearch, artistResults])

  const toggleSelection = (
    id: string,
    chosen: string[],
    setChosen: (value: string[]) => void
  ) => {
    setChosen(
      chosen.includes(id)
        ? chosen.filter((item) => item !== id)
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

    try {
      await completeOnboarding(user.uid, {
        genres: chosenGenres,
        artists: chosenArtists,
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <OnboardingContext.Provider
      value={{
        step, setStep,
        current, itemsToShow,
        canContinue, saving,
        loadingArtists, error,
        handleCardClick, handleContinue,
        MIN_SELECTION,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}