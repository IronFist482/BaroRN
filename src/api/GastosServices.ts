import Request from "./request";

import type {
  EditGastoDiarioParams,
  GastoDiarioParams,
  GastoDiarioResponse,
  GetDayResponse,
  GetGastosResponse,
  GetSemanasResponse,
} from "@utils/types/Gastos/gastos-diarios";
import { AError, Fn } from "@utils/types/helpTypes";

const request = Request("gastos");

export const createGastoDiario = async (params: GastoDiarioParams) => {
  try {
    const { data } = await request.post<GastoDiarioResponse>(
      "/createGastoDiario",
      params
    );
    return {
      data,
      message: "Gasto creado",
      ok: true,
    };
  } catch (err) {
    const e = err as AError;
    return {
      data: null,
      message: e.response?.data.message || "Error al crear gasto",
      ok: false,
    };
  }
};

export const editGastoDiario = async (params: EditGastoDiarioParams) => {
  try {
    const { data } = await request.post<GastoDiarioResponse>(
      "/updateGasto",
      params
    );
    return {
      data,
      message: "Gasto editado",
      ok: true,
    };
  } catch (err) {
    const e = err as AError;
    return {
      data: null,

      message: e.response?.data.message || "Error al editar gasto",
      ok: false,
    };
  }
};

export const getGastosDiarios = async () => {
  try {
    const { data } = await request.get<GetGastosResponse>("/getGastos");
    return {
      data,
      message: "Gastos obtenidos",
      ok: true,
    };
  } catch (err) {
    const e = err as AError;
    return {
      data: null,
      message: e.response?.data.message || "Error al obtener gastos",
      ok: false,
    };
  }
};

export const getSemanas = async (semana?: string) => {
  try {
    const { data } = await request.get<GetSemanasResponse>(
      `/getSemanas${semana ? `/${semana}` : ""}`
    );
    return {
      data,
      message: "Semanas obtenidas",
      ok: true,
    };
  } catch (err) {
    const e = err as AError;
    console.log("e.response?.data.message ->", e);
    return {
      data: null,
      message: e.response?.data.message || "Error al obtener semanas",
      ok: false,
    };
  }
};

export const getDay: Fn<string, GetDayResponse> = async (day) => {
  try {
    const { data } = await request.get(`/getDay/${day}`);
    return {
      data,
      message: "Dia obtenido",
      ok: true,
    };
  } catch (err) {
    console.log(err);
    const e = err as AError;
    return {
      data: null,
      message: e.response?.data.message || "Error al obtener dia",
      ok: false,
    };
  }
};
