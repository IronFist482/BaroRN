import Request from "./request";

import {
  CreateIngresoParams,
  CreateIngresoResponse,
  GetIngresoResponse,
} from "@utils/types/Gastos/gastos-diarios";
import type { AError, Fn } from "@utils/types/helpTypes";

const request = Request("ingresos");

export const getIngresos: Fn<{}, GetIngresoResponse> = async () => {
  try {
    const { data } = await request.get("/getIngresos");
    return {
      data,
      message: "Ingresos obtenidos",
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

export const createIngreso: Fn<
  CreateIngresoParams,
  CreateIngresoResponse
> = async (params) => {
  try {
    const { data } = await request.post("/updateIngreso", params);
    return {
      data,
      message: "Ingreso creado",
      ok: true,
    };
  } catch (err) {
    const e = err as AError;
    return {
      data: null,
      message: e.response?.data.message || "Error al crear ingreso",
      ok: false,
    };
  }
};
