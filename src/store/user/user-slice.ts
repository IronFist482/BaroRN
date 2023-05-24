import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { User } from '@utils/types/User/index'

export interface SessionState {
  token: string | null
  user: User
}

const initialState: SessionState = {
  token: '',
  user: {
    usuId: 0,
    usuEmail: '',
    dataUser: {
      datId: 0,
      datName: '',
      datPhoto: '',
      datProfile: 0,
      datBalance: 0,
    },
  },
}

export const sessionSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    removeToken: (state) => {
      state.token = ''
      state.user = initialState.user
    },
    updateBalance: (state, action: PayloadAction<number>) => {
      state.user.dataUser.datBalance = action.payload
    },
    editProfile: (
      state,
      action: PayloadAction<Partial<Pick<User, 'usuEmail' | 'dataUser'>>>
    ) => {
      state.user.usuEmail = action.payload.usuEmail || state.user.usuEmail
      state.user.dataUser.datName =
        action.payload.dataUser?.datName || state.user.dataUser.datName
    },
    editPhoto: (state, action: PayloadAction<string>) => {
      state.user.dataUser.datPhoto = action.payload
    },
  },
})

export const {
  setToken,
  setUser,
  removeToken,
  updateBalance,
  editProfile,
  editPhoto,
} = sessionSlice.actions
export default sessionSlice.reducer
