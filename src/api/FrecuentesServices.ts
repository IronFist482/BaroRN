import Request from './request'

import type {
  GetGastosFrecuentesResponse,
  PostGastoFrecuenteParams,
  PostGastoFrecuenteResponse,
} from '@utils/types/Frecuentes'
import { AError, Fn, FnNoParam } from '@utils/types/helpTypes'

const request = Request('frecuentes')

export const createFrecuente: Fn<
  PostGastoFrecuenteParams,
  PostGastoFrecuenteResponse
> = async (params) => {
  try {
    const { data } = await request.post('/', params)
    return {
      data,
      message: 'Frecuente creado',
      ok: true,
    }
  } catch (err) {
    const e = err as AError
    return {
      data: null,
      message: e.response?.data.message || 'Error al crear frecuente',
      ok: false,
    }
  }
}

export const getFrecuentes: FnNoParam<
  GetGastosFrecuentesResponse
> = async () => {
  try {
    const { data } = await request.get('/')
    return {
      data,
      message: 'Frecuentes obtenidos',
      ok: true,
    }
  } catch (err) {
    const e = err as AError
    return {
      data: null,
      message: e.response?.data.message || 'Error al obtener frecuentes',
      ok: false,
    }
  }
}
