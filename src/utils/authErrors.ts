import type { AuthError } from "firebase/auth"

export default function getAuthErrorMessage(error: AuthError): string {
  switch (error.code) {
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Invalid email or password."

    case "auth/email-already-in-use":
      return "This email is already in use."

    case "auth/weak-password":
      return "Password must be at least 6 characters long."

    case "auth/invalid-email":
      return "Please enter a valid email address."

    case "auth/popup-closed-by-user":
      return "Google sign-in was cancelled."

    case "auth/too-many-requests":
      return "Too many attempts. Please try again in a few minutes."

    default:
      return "Something went wrong. Please try again."
  }
}