import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  accessToken: string;
}

const initialState: AuthState = {
  accessToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLogin: (state: AuthState, action: PayloadAction<AuthState>) => {
      state.accessToken = action.payload.accessToken;
    },
    onLogout: (state: AuthState) => {
      state.accessToken = "";
    },
  },
});

export const { onLogin, onLogout } = authSlice.actions;

export default authSlice.reducer;
