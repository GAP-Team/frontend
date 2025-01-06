import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import {
  Tender,
  BuildingTenders,
} from "@/screens/dashboard/tenders/tender_card/types";
import userAPIs from "@/api/user";
interface TenderState {
  tenderNumbers: number;
  tenders: BuildingTenders[];
  tendersList: Tender[];
  loading: boolean;
  error: string | null;
}

const initialState: TenderState = {
  tenderNumbers: 0,
  tenders: [] as BuildingTenders[],
  tendersList: [] as Tender[],
  loading: false as boolean,
  error: null as string | null,
};

export const fetchTenders = createAsyncThunk(
  "tender/fetchTenders",
  async (userId: string) => {
    const response = await userAPIs.getUserTenders(userId);
    return response.data;
  }
);

const tenderSlice = createSlice({
  name: "tender",
  initialState,
  reducers: {
    setTenderNumbers: (state, action: PayloadAction<any>) => {
      state.tenderNumbers = action.payload;
    },
    setTendersByBuilding: (state, action: PayloadAction<BuildingTenders[]>) => {
      state.tenders = action.payload;
    },
    setTenders: (state, action: PayloadAction<Tender[]>) => {
      state.tendersList = action.payload;
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

export const {
  setTenderNumbers,
  removeTender,
  setTendersByBuilding,
  setTenders,
} = tenderSlice.actions;

export const currentTenderNumbers = (state: RootState): number =>
  state.tender.tenderNumbers;
export const getAllTenders = (state: RootState): Tender[] =>
  state.tender.tendersList;

export const selectTenderById = (
  state: RootState,
  tenderId: string
): Tender | null => {
  for (const building of state.tender.tenders) {
    const tender = building.tenders.find(
      (tender: Tender) => tender.id === tenderId
    );
    if (tender) return tender;
  }
  return null;
};

export default tenderSlice.reducer;
