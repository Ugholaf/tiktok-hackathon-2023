import { createSlice } from "@reduxjs/toolkit";

export interface ApiKeyState {
  apiKeySet: boolean;
}

const initialState: ApiKeyState = {
  apiKeySet: false,
};

export const apiKeySlice = createSlice({
  name: "apiKey",
  initialState,
  reducers: {
    onApiKeySet: (state: ApiKeyState) => {
      state.apiKeySet = true;
    },
  },
});

export const { onApiKeySet } = apiKeySlice.actions;

export default apiKeySlice.reducer;
