import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  accessToken: string;
}

interface LoginResponse {
  accessToken: string;
}

const initialState: AuthState = {
  accessToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLogin: (state: AuthState, action: PayloadAction<LoginResponse>) => {
      state.accessToken = action.payload.accessToken;
    },
    onLogout: (state: AuthState) => {
      state.accessToken = "";
    },
  },
});

export const { onLogin, onLogout } = authSlice.actions;

export default authSlice.reducer;
