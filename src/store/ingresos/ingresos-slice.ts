import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Ingreso } from '@utils/types/Gastos/gastos-diarios'

export interface IngresosState {
  ingresos: Ingreso[]
}

const initialState: IngresosState = {
  ingresos: [],
}

export const ingresosSlice = createSlice({
  name: 'ingresos',
  initialState,
  reducers: {
    setIngresos: (state, action: PayloadAction<Ingreso[]>) => {
      state.ingresos = action.payload
    },
  },
})

export const { setIngresos } = ingresosSlice.actions

export default ingresosSlice.reducer
