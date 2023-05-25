import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { Frecuente } from "@utils/types/Frecuentes";
import { COLORS_FREQ } from "../../utils/types/Frecuentes/index";

export interface FrecuentesState {
  gastosFrecuentes: Frecuente[];
  gastosProximos: (Frecuente & {
    nextCobDate: string;
    daysTillNextCob: number;
    priorityColor: COLORS_FREQ;
  })[];
}

const initialState: FrecuentesState = {
  gastosFrecuentes: [],
  gastosProximos: [],
};

export const gastosSlice = createSlice({
  name: "frecuentes",
  initialState,
  reducers: {
    setGastosFrecuentes: (state, action: PayloadAction<Frecuente[]>) => {
      state.gastosFrecuentes = action.payload;
    },
    setGastosProximos: (
      state,
      action: PayloadAction<FrecuentesState["gastosProximos"]>
    ) => {
      state.gastosProximos = action.payload;
    },

    addGastoFrecuente: (state, action: PayloadAction<Frecuente>) => {
      state.gastosFrecuentes.push(action.payload);
    },
    deleteFreq: (state, action: PayloadAction<number>) => {
      state.gastosFrecuentes = state.gastosFrecuentes.filter(
        (gasto) => gasto.freId !== action.payload
      );
    },

    clearFrecuentes: (state) => {
      state.gastosFrecuentes = [];
      state.gastosProximos = [];
    },
  },
});

export const {
  clearFrecuentes,
  setGastosFrecuentes,
  deleteFreq,
  setGastosProximos,
  addGastoFrecuente,
} = gastosSlice.actions;
export default gastosSlice.reducer;
