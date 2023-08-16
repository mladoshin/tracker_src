import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  email: String;
  id: number;
  name: String;
}
interface AuthSliceState {
  auth: boolean;
  user: IUser | null;
}

const initialState: AuthSliceState = {
  auth: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.auth = true
      state.user = action.payload
    },
    logout: (state, action: PayloadAction<void>) => {
      state.user = null
      state.auth = false
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
