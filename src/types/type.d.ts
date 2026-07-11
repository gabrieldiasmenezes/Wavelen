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

interface CardItem {
  id: string;
  name: string;
  photo: string;
}