import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import {
  Tender,
  BuildingTenders,
} from "@/screens/dashboard/tenders/tender_card/types";
import userAPIs from "@/api/user";

interface TenderState {
  numOfTenders: number;
  tenders: BuildingTenders[];
  tendersList: Tender[];
  loading: boolean;
  error: string | null;
}

const initialState: TenderState = {
  numOfTenders: 0,
  tenders: [] as BuildingTenders[],
  tendersList: [] as Tender[],
  loading: false as boolean,
  error: null as string | null,
};

const fetchTendersByBuilding = createAsyncThunk(
  "tender/fetchTenders",
  async (param: {
    userId: string;
    city?: string;
    state?: string;
    facilityType?: string;
  }) => {
    const { userId, city, state, facilityType } = param;
    const response = await userAPIs.getUserTenders(
      userId,
      city,
      state,
      facilityType
    );
    return response.data;
  }
);

export const fetchTenders = (
  userId: string,
  city?: string,
  state?: string,
  facilityType?: string
): ReturnType<typeof fetchTendersByBuilding> =>
  fetchTendersByBuilding({ userId, city, state, facilityType });

const tenderSlice = createSlice({
  name: "tender",
  initialState,
  reducers: {
    setTenderNumbers: (state, action: PayloadAction<any>) => {
      state.numOfTenders = action.payload;
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
      .addCase(fetchTendersByBuilding.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTendersByBuilding.fulfilled, (state, action) => {
        state.tenders = action.payload;
        state.numOfTenders = action.payload.reduce(
          (total: number, building: BuildingTenders) =>
            total + (building?.tenders?.length || 0),
          0
        );
        state.tendersList = action.payload?.flatMap(
          (building: BuildingTenders) => building.tenders ?? []
        );
        state.loading = false;
      })
      .addCase(fetchTendersByBuilding.rejected, (state, action) => {
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
  state.tender.numOfTenders;
export const getAllTenders = (state: RootState): Tender[] =>
  state.tender.tendersList;

export default tenderSlice.reducer;
