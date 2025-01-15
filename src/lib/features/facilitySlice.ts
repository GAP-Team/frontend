import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Facility } from "@/screens/dashboard/facilities/facility_card/types";
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

// Async thunk to fetch facilities for a specific building
export const fetchFacilities = createAsyncThunk(
  "facilities/fetchForBuilding",
  async (buildingId: string, { rejectWithValue }) => {
    try {
      const response = await buildingAPIs.getBuildingFacilities(buildingId);
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch facilities");
    }
  }
);


const FacilitySlice = createSlice({
  name: "facility",
  initialState,
  reducers: {
    setFacilities: (state, action: PayloadAction<Facility[]>) => {
      state.facilities =
        action.payload;
    },
    addFacilities: (
      state,
      action: PayloadAction<Facility[]>
    ) => {
      const existingIds = new Set(state.facilities.map(f => f.id));
      const uniqueNewFacilities = action.payload.filter(
        facility => !existingIds.has(facility.id)
      );
      state.facilities = [...state.facilities, ...uniqueNewFacilities];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFacilities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFacilities.fulfilled, (state, action) => {
        // Add the facilities to the flat array
        const newFacilities = action.payload;
        state.facilities = state.facilities.filter(
          (facility) => !newFacilities.some((newFac:Facility) => newFac.id === facility.id)
        );
        state.facilities.push(...newFacilities);
        state.loading = false;
      })
      .addCase(fetchFacilities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFacilities, addFacilities } = FacilitySlice.actions;

export const getAllFacilities = (state: RootState): Facility[] =>
  state.facility.facilities;

export const getFacilitiesByBuilding = (state: RootState, buildingId: string): Facility[] =>
  state.facility.facilities.filter((facility:Facility) => facility.buildingId === buildingId);


export default FacilitySlice.reducer;
