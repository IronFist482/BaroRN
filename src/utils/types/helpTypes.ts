import type { AxiosError } from 'axios'

export type AError = AxiosError<{ message: string }>

export type ResponseStructure<T> =
  | {
      data: T
      message: string
      ok: boolean
    }
  | {
      data: null
      message: string
      ok: boolean
    }

export type Fn<TParams, TResponse> = (
  params?: TParams
) => Promise<ResponseStructure<TResponse>>

export type FnNoParam<TResponse> = () => Promise<ResponseStructure<TResponse>>
