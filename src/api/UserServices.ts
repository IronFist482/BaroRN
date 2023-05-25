import Request from "./request";

import type {
  DeleteAccountParams,
  EditProfileParams,
  EditProfileResponse,
  SignInParams,
  SignInResponse,
  SignUpParams,
  SignUpResponse,
} from "@utils/types/User";
import type { AError } from "@utils/types/helpTypes";

const request = Request("users");

export const SignUpService = async (params: FormData) => {
  try {
    const { data } = await request.post<SignUpResponse>("/", params, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });
    return {
      data,
      message: "Usuario creado",
      ok: true,
    };
  } catch (err) {
    const e = err as AError;
    console.log("e ->", JSON.stringify(e, null, 2));
    return {
      data: null,
      message: e.response?.data.message || "Error al crear usuario",
      ok: false,
    };
  }
};

export const SignInService = async (params: SignInParams) => {
  try {
    const { data } = await request.post<SignInResponse>("getUser", params);
    return {
      data,
      message: "Inicio de sesión exitoso",
      ok: true,
    };
  } catch (err) {
    const e = err as AError;
    console.log({ e });
    return {
      data: null,
      message: e.response?.data.message || "Error al iniciar sesión",
      ok: false,
    };
  }
};

export const EditProfile = async (params: EditProfileParams) => {
  try {
    const { data } = await request.put<EditProfileResponse>(
      "updateUser",
      params
    );
    return {
      data,
      message: "Perfil editado",
      ok: true,
    };
  } catch (err) {
    const e = err as AError;
    return {
      data: null,
      message: e.response?.data.message || "Error al editar perfil",
      ok: false,
    };
  }
};

export const UploadPhoto = async (formData: FormData) => {
  try {
    const { data } = await request.post<{ message: string; filename: string }>(
      "updatePhoto",
      formData
    );
    return {
      data,
      message: "Foto subida",
      ok: true,
    };
  } catch (err) {
    const e = err as AError;
    return {
      data: null,
      message: e.response?.data.message || "Error al subir foto",
      ok: false,
    };
  }
};

export const LogOut = async () => {
  try {
    const { data } = await request.get<{ message: string }>("logout");
    console.log(data);
    return {
      data,
      message: "Sesión cerrada",
      ok: true,
    };
  } catch (err) {
    const e = err as AError;
    console.log(e);
    return {
      data: null,
      message: e.response?.data.message || "Error al cerrar sesión",
      ok: false,
    };
  }
};

export const CleanAccount = async () => {
  try {
    const { data } = await request.get<{ message: string }>("cleanAccount");
    console.log(data);
    return {
      data,
      message: "Cuenta limpiada",
      ok: true,
    };
  } catch (err) {
    const e = err as AError;
    console.log(e);
    return {
      data: null,
      message: e.response?.data.message || "Error al limpiar cuenta",
      ok: false,
    };
  }
};

export const DeleteAccount = async (params: DeleteAccountParams) => {
  try {
    const { data } = await request.post<{ message: string }>(
      "deleteAccount",
      params
    );
    console.log(data);
    return {
      data,
      message: "Cuenta eliminada",
      ok: true,
    };
  } catch (err) {
    const e = err as AError;
    console.log(e);
    return {
      data: null,
      message: e.response?.data.message || "Error al eliminar cuenta",
      ok: false,
    };
  }
};
