import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { RootState } from '@store/index'
import ROUTES from '@utils/ROUTES'

type RedirectionType = 'toHome' | 'toSignIn'

export const useListenAuth = (
  type: RedirectionType,
  ...routesToIgnore: string[]
) => {
  const nav = useNavigate()
  const { user } = useSelector((state: RootState) => state.user)
  const route = useLocation()

  useEffect(() => {
    if (type === 'toHome') {
      if (
        user.dataUser.datName?.trim() !== ''
        // && !routesToIgnore.some((routeIgnored) => route.pathdataUser.datName === routeIgnored)
      ) {
        nav(ROUTES.Home)
      }
    } else if (type === 'toSignIn') {
      if (
        user.dataUser.datName?.trim() === '' &&
        !routesToIgnore.some((routeIgnored) => route.pathname === routeIgnored)
      ) {
        nav(ROUTES.Index)
      }
    }
  }, [user])
}
