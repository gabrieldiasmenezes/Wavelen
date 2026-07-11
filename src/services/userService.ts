import type { User } from "firebase/auth";
import {doc,getDoc,serverTimestamp,setDoc, updateDoc,} from "firebase/firestore";
import { db } from "../lib/firebase";

export async function createUserDocument(user: User) {
  const userRef = doc(db, "users", user.uid);

  const snapshot = await getDoc(userRef);

  if (snapshot.exists()) return;

  await setDoc(userRef, {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,

    onboardingCompleted: false,

    createdAt: serverTimestamp(),

    musicProfile: {
      genres: [],
      artists: [],
    },
  });
}

export async function getUserData(uid: string): Promise<UserData | null> {

  const userRef = doc(db, "users", uid);

  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) return null;

  return snapshot.data() as UserData;
}


export async function syncUser(firebaseUser: User): Promise<UserData | null> {
  await createUserDocument(firebaseUser);

  return await getUserData(firebaseUser.uid);
}

export async function completeOnboarding(uid: string,musicProfile: MusicProfile): Promise<void> {
  await updateDoc(doc(db, "users", uid), {
    onboardingCompleted: true,
    musicProfile,
  })
}