interface MusicProfile {
    genres: string[];
    artists: string[];
}

interface UserData {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  onboardingCompleted: boolean;
  musicProfile: MusicProfile;
}

interface MusicTrack {
  id: number | string
  name: string
  artist: string
  album: string
  cover: string | null
  previewUrl: string | null
  url?: string
  tags?: string[]
}

interface TrackItem {
  id: string;
  name: string;
  photo: string | null;
}

type DeezerEndpoint = "search" | "artist"


type ToggleButtonProps = {
  active:boolean
}