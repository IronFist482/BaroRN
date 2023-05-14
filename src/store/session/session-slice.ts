import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { User } from "@utils/types/User";

export interface SessionState {
  token: string | null;
  user: User;
}

const initialState: SessionState = {
  token: "",
  user: {
    balance: 0,
    email: "",
    id: 0,
    name: "",
    photo: "",
    profile: 0,
  },
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    removeToken: (state) => {
      state.token = "";
      state.user = initialState.user;
    },
    updateBalance: (state, action: PayloadAction<number>) => {
      state.user.balance = action.payload;
    },
    editProfile: (
      state,
      action: PayloadAction<Partial<Pick<User, "email" | "name">>>
    ) => {
      state.user.email = action.payload.email || state.user.email;
      state.user.name = action.payload.name || state.user.name;
    },
    editPhoto: (state, action: PayloadAction<string>) => {
      state.user.photo = action.payload;
    },
  },
});

export const {
  setToken,
  setUser,
  removeToken,
  updateBalance,
  editProfile,
  editPhoto,
} = sessionSlice.actions;
export default sessionSlice.reducer;
