import { Day } from '../Gastos/gastos-diarios'
import { User } from '../User'

import { FreqColors, Periodo } from '@scenes/frequence/componetsfreq'

export type PostGastoFrecuenteParams = {
  name: string
  amount: number
  lapse: Periodo
  isStatic: boolean
  date?: string
  description?: string
}

export const LAPSES_TO_INT = {
  Semanal: 'Semanal',
  Quincenal: 'Quincenal',
  Mensual: 'Mensual',
  Bimestral: 'Bimestral',
  Trimestral: 'Trimestral',
}

export type LAPSES_TYPE = typeof LAPSES_TO_INT
export type LAPSES = keyof LAPSES_TYPE

export type COLORS_FREQ = 'Light' | 'Medium' | 'Hard'

export type CobroFreq = {
  cobId: number
  cobDate: string

  frecuente?: Omit<Frecuente, 'cobros'>
}

export type Frecuente = {
  freId: number
  freName: string
  freDescription: string
  freAmount: number
  freLapse: Periodo
  freIsStatic: boolean
  day: Omit<Day, 'frecuentes'>

  user?: Omit<User, 'frecuentes'>
  cobros?: Omit<CobroFreq, 'frecuentes'>[]
}

export type PostGastoFrecuenteResponse = {
  message: 'Gasto creado'
  gasto: Frecuente
}

export type GetGastosFrecuentesResponse = {
  message: 'Gastos obtenidos'
  frecuentes: Frecuente[]
  proximos: (Frecuente & {
    nextCobDate: string
    daysTillNextCob: number
    priorityColor: FreqColors
  })[]
  notifications: string[]
}

export type UpdateFrecuenteResponse = {
  message: string
  gasto: Frecuente
}
