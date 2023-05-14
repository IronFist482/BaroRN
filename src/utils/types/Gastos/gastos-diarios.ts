export type GastoDiarioParams = {
  nombre: string
  desc: string
  monto: string
  icono: number
}
export type GastoDiarioResponse = {
  message: string
  newBalance: number
}

export type CreateIngresoParams = {
  ingreso: string
  tipo: 'Salario' | 'Honorario' | 'Pensión' | 'Mesada'
  desc: string
}

export type CreateIngresoResponse = {
  message: string
  newBalance: number
}

export type GetGastosResponse = {
  message: string
  gastos: GeneralTypeGastos[]
}

export interface DayRow {
  dayId: number
  dayDate: string
  semId: number
}

export interface SemanasRow {
  semId: number
  semStart: string
  semEnd: string
  usuId: number
}

export interface DiariosRow {
  diaId: number
  diaName: string
  diaDescription: string
  diaAmount: number
  dayId: number
}

export type FinalDay = {
  dayId: number
  dayDate: string
  dayTotal: number
}

export type GetSemanasResponse = {
  message: string
  finalDays: (FinalDay | null)[]
  actualWeek: string
  nextWeek: string | null
  prevWeek: string | null
  stadisticInfo: {
    avgWeek: number
    vsLastWeek: number
    biggestExpense: number
  }
}

export type GetDayResponse = {
  gastosDia: (SemanasRow & DayRow & DiariosRow)[]
  avgDay: number
  diffDays: number
  mostExpensiveCharge: number
  byAmount: [number, number, number, number, number]
  days: { lastDay: null | string; nextDay: null | string }
  dayName: string
}

export type GeneralTypeGastos = {
  diaId: number
  diaName: string
  diaDescription: string
  diaAmount: number
  diaIcon: number
  dayId: number
}

export type GeneralTypeDay = {
  dayId: number
  dayDate: string
  semId: number
}
export type EditGastoDiarioParams = {
  newDescripcion: string
  newMonto: number
  newIcono: number
  newNombre: string
  id: string
}
