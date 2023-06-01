import Request from "./request";

import type {
  GetGastosFrecuentesResponse,
  PostGastoFrecuenteParams,
  PostGastoFrecuenteResponse,
  UpdateFrecuenteResponse,
} from "@utils/types/Frecuentes";
import { AError, Fn, FnNoParam } from "@utils/types/helpTypes";

const request = Request("frecuentes");

export const createFrecuente: Fn<
  PostGastoFrecuenteParams,
  PostGastoFrecuenteResponse
> = async (params) => {
  try {
    const { data } = await request.post("/", params);
    return {
      data,
      message: "Frecuente creado",
      ok: true,
    };
  } catch (err) {
    const e = err as AError;
    return {
      data: null,
      message: e.response?.data.message || "Error al crear frecuente",
      ok: false,
    };
  }
};

export const getFrecuentes: FnNoParam<
  GetGastosFrecuentesResponse
> = async () => {
  try {
    const { data } = await request.get("/");
    return {
      data,
      message: "Frecuentes obtenidos",
      ok: true,
    };
  } catch (err) {
    const e = err as AError;
    return {
      data: null,
      message: e.response?.data.message || "Error al obtener frecuentes",
      ok: false,
    };
  }
};

export const deleteFrecuente: Fn<
  number,
  { message: string; ok: boolean }
> = async (freqId) => {
  try {
    const { data } = await request.delete(`/${freqId}`);
    return {
      data,
      message: "Frecuente eliminado",
      ok: true,
    };
  } catch (err) {
    const e = err as AError;
    return {
      data: null,
      message: e.response?.data.message || "Error al eliminar frecuente",
      ok: false,
    };
  }
};

export const updateFrecuente: Fn<
  { freqId: number; params: PostGastoFrecuenteParams },
  UpdateFrecuenteResponse
> = async ({ freqId, params }) => {
  try {
    const { data } = await request.put(`/${freqId}`, params);
    return {
      data,
      message: "Frecuente actualizado",
      ok: true,
    };
  } catch (err) {
    const e = err as AError;
    return {
      data: null,
      message: e.response?.data.message || "Error al actualizar frecuente",
      ok: false,
    };
  }
};

export const getFrecuente: Fn<number, PostGastoFrecuenteResponse> = async (
  freqId
) => {
  try {
    const { data } = await request.get(`/${freqId}`);
    return {
      data,
      message: "Frecuente obtenido",
      ok: true,
    };
  } catch (err) {
    const e = err as AError;
    return {
      data: null,
      message: e.response?.data.message || "Error al obtener frecuente",
      ok: false,
    };
  }
};
