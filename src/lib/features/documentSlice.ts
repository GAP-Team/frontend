import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

interface DocumentState {
  key: string;
  name: string;
  documentType: string;
}

const initialState: DocumentState = {
  key: "",
  name: "",
  documentType: "",
};

const documentSclice = createSlice({
  name: "document",
  initialState,
  reducers: {
    setDocumentType: (state, action: PayloadAction<any>) => {
      state.documentType = action.payload?.documentType;
    },
  },
});

export const { setDocumentType } = documentSclice.actions;

export const currentDocumentType = (state: RootState): string =>
  state.documentType;
