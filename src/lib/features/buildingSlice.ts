import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAPIs from "@/api/user";
import { RootState } from "../store";
import { Building } from "@/screens/dashboard/buildings/building_card/types";
interface queryType {
  userId: string;
  city: string;
  federalState: string;
  facilityType: string;
}

interface BuildingState {
  buildings: Building[];
  loading: boolean;
  error: string | null;
}

const initialState: BuildingState = {
  buildings: [],
  loading: false as boolean,
  error: null as string | null,
};

export const fetchBuildings = createAsyncThunk(
  "building/fetchBuildings",
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
        state.error = action.error.message || "Failed to fetch buildings";
        state.loading = false;
      });
  },
});

export const { setUserBuildingDetails } = buildingSlice.actions;

export const getUserBuildings = (state: RootState): any =>
  state.building.buildings;
export const getBuildingById = (id: string) => (state: RootState) =>
  state.building.buildings.find((building: Building) => building.id === id);

export default buildingSlice.reducer;
