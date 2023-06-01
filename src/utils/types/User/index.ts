import { Frecuente } from "../Frecuentes";
import { Ingreso, Semana } from "../Gastos/gastos-diarios";

export interface DataUser {
  datId: number;
  datName: string;
  datPhoto: string;
  datProfile: number;
  datBalance: number;

  user?: Omit<User, "dataUser"> | null;
}

export interface User {
  usuId: number;
  usuEmail: string;
  dataUser: DataUser;

  semanas?: Semana[];
  ingresos?: Ingreso[];
  frecuentes?: Frecuente[];
}
export interface SignInParams {
  correo: string;
  contraseña: string;
}
export interface SignInResponse {
  message: string;
  user: User;
  token: string;
}

export interface SignUpParams {
  correo: string;
  contrasena: string;
  nombre: string;
  contrasenaConfirmada: string;
}

export type SignUpResponse = SignInResponse;

export type EditProfileParams = {
  name: string;
  newPassword: string;
  actualPassword: string;
  email?: string;
};

export type EditProfileResponse = {
  message: string;
  user: User;
};

export type DeleteAccountParams = { password?: string };
