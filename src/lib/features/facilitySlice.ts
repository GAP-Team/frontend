import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Facility } from "@/screens/dashboard/facilities/facility_card/types";
import userAPIs from "@/api/user";
import buildingAPIs from "@/api/building";

interface FacilityState {
  facilities: Facility[];
  loading: boolean;
  error: string | null;
}

const initialState: FacilityState = {
  facilities: [] as Facility[],
  loading: false as boolean,
  error: null as string | null,
};

export const fetchFacilities = createAsyncThunk(
  "facility/fetchFacilities",
  async (buildingId: string) => {
    const response = await buildingAPIs.getBuildingFacilities(buildingId);
    return response.data;
  }
);

const FacilitySlice = createSlice({
  name: "facility",
  initialState,
  reducers: {
    setFacilities: (state, action: PayloadAction<Facility[]>) => {
      state.facilities = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFacilities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFacilities.fulfilled, (state, action) => {
        state.facilities = action.payload;
        state.loading = false;
      })
      .addCase(fetchFacilities.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch facilities";
        state.loading = false;
      });
  },
});

export const { setFacilities } = FacilitySlice.actions;

export const getAllFacilities = (state: RootState): Facility[] =>
  state.facility.facilities;

export default FacilitySlice.reducer;
