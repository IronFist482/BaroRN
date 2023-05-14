import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { FrecuenteRow } from "@utils/types/Frecuentes";

export interface FrecuentesState {
  gastosFrecuentes: FrecuenteRow[];
}

const initialState: FrecuentesState = {
  gastosFrecuentes: [],
};

export const frecuentesSlice = createSlice({
  name: "frecuentes",
  initialState,
  reducers: {
    setGastosFrecuentes: (state, action: PayloadAction<FrecuenteRow[]>) => {
      state.gastosFrecuentes = action.payload;
    },

    addGastoFrecuente: (state, action: PayloadAction<FrecuenteRow>) => {
      state.gastosFrecuentes.push(action.payload);
    },

    clearFrecuentes: (state) => {
      state.gastosFrecuentes = [];
    },
  },
});

export const { clearFrecuentes, setGastosFrecuentes, addGastoFrecuente } =
  frecuentesSlice.actions;
export default frecuentesSlice.reducer;
