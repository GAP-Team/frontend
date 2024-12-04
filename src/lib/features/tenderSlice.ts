import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { Building } from "@/screens/dashboard/tenders/tender_card/types";
import tenderAPIs from "@/api/tender";

interface TenderState {
  numOfTenders: number;
  tenders: Building[];
  loading: boolean;
  error: string | null;
}

const initialState: TenderState = {
  numOfTenders: 0,
  tenders: [] as Building[],
  loading: false as boolean,
  error: null as string | null,
};

export const fetchTenders = createAsyncThunk(
  "tender/fetchTenders",
  async (userId: string) => {
    const response = await tenderAPIs.getTenders(userId);
    return response.data;
  }
);

const tenderSlice = createSlice({
  name: "tender",
  initialState,
  reducers: {
    setTenderNumbers: (state, action: PayloadAction<any>) => {
      state.numOfTenders = action.payload;
    },
    setTenders: (state, action: PayloadAction<Building[]>) => {
      state.tenders = action.payload;
    },
    removeTender: (state, action: PayloadAction<string>) => {
      state.tenders = state.tenders.map((tender) => ({
        ...tender,
        tenders: tender.tenders.filter(
          (tender) => tender.id !== action.payload
        ),
      }));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTenders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTenders.fulfilled, (state, action) => {
        state.tenders = action.payload;
        state.loading = false;
      })
      .addCase(fetchTenders.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch tenders";
        state.loading = false;
      });
  },
});

export const { setTenderNumbers, removeTender, setTenders } =
  tenderSlice.actions;

export const currentTenderNumbers = (state: RootState): number =>
  state.tender.numOfTenders;

export default tenderSlice.reducer;
