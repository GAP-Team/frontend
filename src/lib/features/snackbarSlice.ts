"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type VerticalPosition = "top" | "bottom";
export type HorizontalPosition = "left" | "center" | "right";

export interface SnackbarState {
  type: "success" | "info" | "warning" | "error" | undefined;
  message: string;
  title?: string;
  persistent?: boolean;
  vertical?: VerticalPosition;
  horizontal?: HorizontalPosition;
}

const initialState: SnackbarState = {
  type: undefined,
  message: "",
  title: undefined,
  persistent: false,
  vertical: "bottom",
  horizontal: "center",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<SnackbarState>) => ({
      type: action.payload.type,
      message: action.payload.message,
      title: action.payload.title,
      persistent: action.payload.persistent,
      vertical: action.payload.vertical,
      horizontal: action.payload.horizontal,
    }),
    hidesnackbar: (_state) => initialState,
  },
});

export const { showSnackbar, hidesnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
