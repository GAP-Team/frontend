"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SnackbarState {
  type: "success" | "info" | "warning" | "error" | undefined;
  message: string;
}

const initialState: SnackbarState = {
  type: undefined,
  message: "",
};
const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<SnackbarState>) => ({
      type: action.payload.type,
      message: action.payload.message,
    }),
    hidesnackbar: (state) => initialState,
  },
});

export const { showSnackbar, hidesnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
