import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { Document } from "@/typings/types";

const initialState: Document = {
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
