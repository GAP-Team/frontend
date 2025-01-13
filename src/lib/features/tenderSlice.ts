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
  tenderList: Tender[];
  loading: boolean;
  error: string | null;
}

const initialState: TenderState = {
  numOfTenders: 0,
  tenders: [] as BuildingTenders[],
  tenderList: [] as Tender[],
  loading: false as boolean,
  error: null as string | null,
};

const getTenders = createAsyncThunk(
  "tender/getTenders",
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
): ReturnType<typeof getTenders> =>
  getTenders({ userId, city, state, facilityType });

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
      state.tenderList = action.payload;
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
      .addCase(getTenders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTenders.fulfilled, (state, action) => {
        state.tenders = action.payload;
        state.numOfTenders = action.payload.reduce(
          (total: number, building: BuildingTenders) =>
            total + (building?.tenders?.length || 0),
          0
        );
        state.tenderList =
          action.payload?.flatMap(
            (building: BuildingTenders) => building?.tenders ?? []
          ) ?? [];
        state.loading = false;
      })
      .addCase(getTenders.rejected, (state, action) => {
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
