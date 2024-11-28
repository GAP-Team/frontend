import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userAPIs from "@/api/user";
import { RootState } from "../store";
import { AddBuildingFormValues } from "@/screens/dashboard/buildings/add_building_form/types";

interface queryType {
  userId: string;
  city: string;
  federalState: string;
  facilityType: string;
}

interface BuildingState {
  buildings: AddBuildingFormValues[];
  loading: boolean;
  error: string | null;
}

const initialState: BuildingState = {
  buildings: [],
  loading: false as boolean,
  error: null as string | null,
};

export const fetchBuildings = createAsyncThunk(
  "tender/fetchBuildings",
  async (query: queryType) => {
    const response = await userAPIs.getBuildings(
      query.userId,
      query.city,
      query.federalState,
      query.facilityType
    );
    return response.data;
  }
);

const buildingSlice = createSlice({
  name: "building",
  initialState,
  reducers: {
    setUserBuildingDetails: (state, action) => {
      state.buildings = action?.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBuildings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBuildings.fulfilled, (state, action) => {
        state.buildings = action.payload;
        state.loading = false;
      })
      .addCase(fetchBuildings.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch tenders";
        state.loading = false;
      });
  },
});

export const { setUserBuildingDetails } = buildingSlice.actions;

export const getUserBuildings = (state: RootState): any =>
  state.building.buildings;

export default buildingSlice.reducer;
