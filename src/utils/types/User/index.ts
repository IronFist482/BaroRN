export interface User {
  id: number
  email: string
  name: string
  photo: string
  profile: number
  balance: number
}
export interface SignInParams {
  correo: string
  contraseña: string
}
export interface SignInResponse {
  message: string
  user: User
  token: string
}

export interface SignUpParams {
  correo: string
  contrasena: string
  nombre: string
  contrasenaConfirmada: string
}

export type SignUpResponse = SignInResponse

export type EditProfileParams = {
  name: string
  newPassword: string
  newPasswordConfirmed: string
  email?: string
}

export type EditProfileResponse = {
  message: string
  user: User
}

export type DeleteAccountParams = { password?: string }
