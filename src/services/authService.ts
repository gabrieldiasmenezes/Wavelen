import {
  createUserWithEmailAndPassword,GoogleAuthProvider,
  signInWithEmailAndPassword,signInWithPopup,
  signOut,updateProfile,
} from "firebase/auth";
import { auth } from "../lib/firebase";

export async function login(email: string,password: string) {
  await signInWithEmailAndPassword(auth, email, password);
}

export async function register(name: string,email: string,password: string) {
  const credential = await createUserWithEmailAndPassword(
    auth,email,password
  );

  await updateProfile(credential.user, {
    displayName: name,
  });

  return credential.user;
}

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();

  const credential = await signInWithPopup(auth, provider);

  return credential.user;
}

export async function logout() {
  await signOut(auth);
}