import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  GeneralTypeGastos,
  GetSemanasResponse,
} from "@utils/types/Gastos/gastos-diarios";

export interface GastosState {
  gastosDiarios: GeneralTypeGastos[];
  analytics: GetSemanasResponse;
}

const initialState: GastosState = {
  gastosDiarios: [],
  analytics: {
    actualWeek: "",
    finalDays: [],
    message: "",
    nextWeek: "",
    prevWeek: "",
    stadisticInfo: {
      avgWeek: 0,
      biggestExpense: 0,
      vsLastWeek: 0,
    },
  },
};

export const gastosSlice = createSlice({
  name: "gastos",
  initialState,
  reducers: {
    setGastosDiarios: (state, action: PayloadAction<GeneralTypeGastos[]>) => {
      state.gastosDiarios = action.payload;
    },
    setAnalytics: (state, action: PayloadAction<GetSemanasResponse>) => {
      state.analytics = action.payload;
    },

    clearGastos: (state) => {
      state.gastosDiarios = [];
    },
  },
});

export const { setGastosDiarios, setAnalytics, clearGastos } =
  gastosSlice.actions;
export default gastosSlice.reducer;
