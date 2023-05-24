import { Frecuente } from '../Frecuentes'
import { User } from '../User'

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

export interface Ingreso {
  ingId: number
  ingDate: string
  ingType: SalarioTypes
  ingAmount: number
  ingDescription: string

  user?: Omit<User, 'ingresos'> | null
}

export type SalarioTypes = 'Salario' | 'Honorario' | 'Pensión' | 'Mesada'

export type CreateIngresoParams = {
  ingreso: string
  tipo: SalarioTypes
  desc: string
}

export type CreateIngresoResponse = {
  message: string
  newBalance: number
}

export type GetGastosResponse = {
  message: string
  gastos: (Diario & {
    day: Omit<Day, 'diarios'>
  })[]
}

export interface Day {
  dayId: number
  dayDate: string

  semana?: Semana
  diarios?: Diario[]
  frecuentes?: Frecuente[]
}

export interface Semana {
  semId: number
  semStart: string
  semEnd: string

  user: Omit<User, 'semanas'>
}

export interface Diario {
  diaId: number
  diaName: string
  diaDescription: string
  diaAmount: number
  diaIcon: number
  diaCategory: null

  day?: Omit<Day, 'diarios'>
}

export type FinalDay = Omit<Day, 'dayId'> & {
  dayId?: number
  dayTotal: number
}

export type GetSemanasResponse = {
  message: string
  finalDays: FinalDay[]
  actualWeek: string
  nextWeek: string | null
  prevWeek: string | null
  stadisticInfo: {
    avgWeek: number
    vsLastWeek: number
    biggestExpense: number
  }
}

export type GetIngresoResponse = {
  message: string
  ingresos: Ingreso[]
}

export type GetDayResponse = {
  gastosDia: Diario[]
  avgDay: number
  diffDays: number
  mostExpensiveCharge: number
  byAmount: [number, number, number, number, number]
  days: { lastDay: null | string; nextDay: null | string }
  dayName: string
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
  id: number
}
