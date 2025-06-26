import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  Tender,
  BuildingTenders,
} from "@/components/features/tenders/tender_card/types";
import userAPIs from "@/api/user";
import tenderAPIs from "@/api/tender";
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

// Create Tender
export const createTender = createAsyncThunk(
  "tender/createTender",
  async (newTender: any) => {
    const response = await tenderAPIs.create(newTender);
    return response.data;
  }
);

// Update tender
export const updateTender = createAsyncThunk(
  "tender/updateTender",
  async ({ tenderId, data }: { tenderId: string; data: any }) => {
    const response = await tenderAPIs.update(tenderId, data);
    return response.data;
  }
);

// Delete tender
export const deleteTender = createAsyncThunk(
  "tender/deleteTender",
  async (tenderId: string) => {
    await tenderAPIs.delete(tenderId);
    return tenderId;
  }
);

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
      })
      // Edit Tender
      .addCase(updateTender.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTender.fulfilled, (state, action) => {
        const updatedTender = action.payload;
        const index = state.tenderList.findIndex(
          (tender) => tender.id === updatedTender.id
        );
        if (index !== -1) {
          state.tenderList[index] = {
            ...state.tenderList[index],
            ...updatedTender,
          };
          state.tenders = state.tenders.map((building) => ({
            ...building,
            tenders: building.tenders.map((tender) =>
              tender.id === updatedTender.id
                ? { ...tender, ...updatedTender }
                : tender
            ),
          }));
        }
        state.loading = false;
      })
      .addCase(updateTender.rejected, (state, action) => {
        state.error = action.error.message || "Failed to edit tender";
        state.loading = false;
      })
      // Delete Tender
      .addCase(deleteTender.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTender.fulfilled, (state, action) => {
        const tenderId = action.payload;
        state.tenderList = state.tenderList.filter(
          (tender) => tender.id !== tenderId
        );
        state.tenders = state.tenders.map((building) => ({
          ...building,
          tenders: building.tenders.filter((tender) => tender.id !== tenderId),
        }));
        state.numOfTenders -= 1;
        state.loading = false;
      })
      .addCase(deleteTender.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete tender";
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

export const getTenderById =
  (tenderId: string) =>
  (state: RootState): Tender | null =>
    state.tender.tenderList.find((tender: Tender) => tender.id === tenderId) ??
    null;

export const checkActiveTenderForFacility =
  (facilityId: string) =>
  (state: RootState): boolean => {
    const { tenderList } = state.tender;
    return tenderList
      .filter((tender: Tender) => tender.facility.id === facilityId)
      .some((tender: Tender) => tender.status === "ACTIVE");
  };

export default tenderSlice.reducer;
