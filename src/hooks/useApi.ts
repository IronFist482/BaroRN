import { useCallback, useState } from 'react'

import type { Fn, FnNoParam } from '@utils/types/helpTypes'

type ParamsResFn<TFn> = TFn extends Fn<infer TParams, infer TResponse>
  ? [TParams, TResponse]
  : never

export function useApi<TFn extends Fn<any, any> | FnNoParam<any>>(
  fn: TFn
): [
  req: (
    param?: ParamsResFn<TFn>[0]
  ) => Promise<ParamsResFn<TFn>[1] | undefined>,
  loading: boolean,
  error: null | string,
  data: ParamsResFn<TFn>[1] | undefined
] {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ParamsResFn<TFn>[1] | undefined>(undefined)

  const req = useCallback(async (param: ParamsResFn<TFn>[0]) => {
    setLoading(true)
    const { data, ok, message } = await fn(param)
    if (!ok || !data) {
      setError(message)
      setLoading(false)

      return undefined
    }

    setError(null)
    setData(data)
    setLoading(false)
    return data
  }, [])

  return [req, loading, error, data]
}
