import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import userAPI from "@/api/user";
import buildingAPI from "@/api/building";
import { RootState } from "../store";
// FIXME: Building should not be imported from the screen, it should be imported from a common types file.
import { Building } from "@/screens/real-estate-owner/buildings/building-overview/types";
interface queryType {
  userId: string;
  city: string;
  state: string;
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
    const response = await userAPI.getBuildings(
      query.userId,
      query.city,
      query.state,
      query.facilityType
    );
    return response.data;
  }
);

export const updateBuilding = createAsyncThunk(
  "building/updateBuilding",
  async ({
    buildingId,
    data,
  }: {
    buildingId: string;
    data: Partial<Building> & { documentUploadType?: string };
  }): Promise<Building> => {
    const response = await buildingAPI.update(buildingId, data);
    return response.data;
  }
);

const buildingSlice = createSlice({
  name: "building",
  initialState,
  reducers: {
    setUserBuilding: (state, action) => {
      state.buildings = action?.payload;
    },
    addBuilding: (state, action: PayloadAction<Building>) => {
      state.buildings = [...state.buildings, action.payload];
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
      })
      .addCase(updateBuilding.fulfilled, (state, action) => {
        // Merge, so fields the update response doesn't carry (e.g. the
        // tenders count) are kept.
        state.buildings = state.buildings.map((building) =>
          building.id === action.payload.id
            ? { ...building, ...action.payload }
            : building
        );
      });
  },
});

export const { setUserBuilding, addBuilding } = buildingSlice.actions;

export const getUserBuildings = (state: RootState): any =>
  state.building.buildings;
export const getBuildingById = (id: string) => (state: RootState) =>
  state.building.buildings.find((building: Building) => building.id === id);

export default buildingSlice.reducer;
