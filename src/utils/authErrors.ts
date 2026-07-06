import type { AuthError } from "firebase/auth"

export default function getAuthErrorMessage(error: AuthError): string {
  switch (error.code) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Email ou senha incorretos.'
    case 'auth/email-already-in-use':
      return 'Este email já está cadastrado.'
    case 'auth/weak-password':
      return 'A senha deve ter pelo menos 6 caracteres.'
    case 'auth/invalid-email':
      return 'Email inválido.'
    case 'auth/popup-closed-by-user':
      return 'Login com Google cancelado.'
    case 'auth/too-many-requests':
      return 'Muitas tentativas. Tente novamente em alguns minutos.'
    default:
      return 'Ocorreu um erro. Tente novamente.'
  }
}