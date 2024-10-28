import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

interface TenderState {
  tenderNumbers: number
}

const initialState: TenderState = {
  tenderNumbers: 0
};

const tenderSlice = createSlice({
  name: "tender",
  initialState,
  reducers: {
    setTenderNumbers: (state, action: PayloadAction<any>) => {
      state.tenderNumbers = action.payload;
    },
  },
});

export const { setTenderNumbers } = tenderSlice.actions;

export const currentTenderNumbers = (state: RootState): number =>
    state.tender.tenderNumbers;
  
export default tenderSlice.reducer;