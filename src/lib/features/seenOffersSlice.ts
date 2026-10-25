import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// How many offers of each tender the owner has already looked at. Kept in the
// persisted store, so an offer stays "seen" after a reload. A new offer raises
// the tender's offer count above the stored number and counts as new again.
interface SeenOffersState {
  seenCounts: Record<string, number>;
}

const initialState: SeenOffersState = { seenCounts: {} };

const seenOffersSlice = createSlice({
  name: "seenOffers",
  initialState,
  reducers: {
    markOffersSeen: (
      state,
      action: PayloadAction<{ tenderId: string; count: number }>
    ) => {
      state.seenCounts[action.payload.tenderId] = action.payload.count;
    },
  },
});

export const { markOffersSeen } = seenOffersSlice.actions;
export default seenOffersSlice.reducer;
