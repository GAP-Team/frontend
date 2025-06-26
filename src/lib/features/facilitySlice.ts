import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Facility } from "@/screens/dashboard/facilities/facility_card/types";
import buildingAPI from "@/api/building";
import userAPI from "@/api/user";
import facilityAPI from "@/api/facility";

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
      const response = await buildingAPI.getFacilitiesOfBuilding(buildingId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch facilities"
      );
    }
  }
);

const getFacilitiesByUserId = createAsyncThunk(
  "facility/getFacilitiesByUserId",
  async (param: {
    userId: string;
    city?: string;
    state?: string;
    facilityType?: string;
  }) => {
    const { userId, city, state, facilityType } = param;
    const response = await userAPI.getFacilitiesOfUser(
      userId,
      city,
      state,
      facilityType
    );
    return response.data;
  }
);

// Delete facility
export const deleteFacility = createAsyncThunk(
  "facility/deleteFacility",
  async (facilityId: string) => {
    await facilityAPI.delete(facilityId);
    return facilityId;
  }
);

export const getFacilitiesByUser = (
  userId: string,
  city?: string,
  state?: string,
  facilityType?: string
): ReturnType<typeof getFacilitiesByUserId> =>
  getFacilitiesByUserId({ userId, city, state, facilityType });

// Create Facility
export const createFacility = createAsyncThunk(
  "facility/createFacility",
  async (newFacility: Facility): Promise<{ id: string }> => {
    const response = await facilityAPI.create(newFacility);
    return response;
  }
);
// Update Facility
export const updateFacility = createAsyncThunk(
  "facility/updateFacility",
  async ({
    facilityId,
    data,
  }: {
    facilityId: string;
    data: Partial<Facility>;
  }) => {
    const response = await facilityAPI.update(facilityId, data);
    return response;
  }
);

const FacilitySlice = createSlice({
  name: "facility",
  initialState,
  reducers: {
    setFacilities: (state, action: PayloadAction<Facility[]>) => {
      state.facilities = action.payload;
    },
    addFacilities: (state, action: PayloadAction<Facility[]>) => {
      const existingIds = new Set(state.facilities.map((f) => f.id));
      const uniqueNewFacilities = action.payload.filter(
        (facility) => !existingIds.has(facility.id)
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
          (facility) =>
            !newFacilities.some((newFac: Facility) => newFac.id === facility.id)
        );
        state.facilities.push(...newFacilities);
        state.loading = false;
      })
      .addCase(fetchFacilities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getFacilitiesByUserId.fulfilled, (state, action) => {
        state.facilities = action.payload; // Update state with fetched facilities
        state.loading = false;
        state.error = null;
      })
      .addCase(getFacilitiesByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFacilitiesByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user facilities";
      })
      // delete facility reducers
      .addCase(deleteFacility.fulfilled, (state, action) => {
        state.facilities = state.facilities.filter(
          (facility) => facility.id !== action.payload
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteFacility.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFacility.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete facility";
      })

      // Update Facility
      .addCase(updateFacility.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFacility.fulfilled, (state, action) => {
        const updatedFacility = action.payload;
        state.facilities = state.facilities.map((facility) =>
          facility.id === updatedFacility.id ? updatedFacility : facility
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(updateFacility.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update facility";
      });
  },
});

export const { setFacilities, addFacilities } = FacilitySlice.actions;

export const getAllFacilities = (state: RootState): Facility[] =>
  state.facility.facilities;

export const getFacilitiesByBuilding =
  (buildingId: string) =>
  (state: RootState): Facility[] =>
    state.facility.facilities.filter(
      (facility: Facility) => facility.buildingId === buildingId
    );

export const getFacilityById =
  (facilityId: string | null | undefined) =>
  (state: RootState): Facility | null => {
    if (!facilityId || !state?.facility?.facilities) return null;

    return (
      state.facility.facilities.find(
        (facility: Facility) => facility?.id === facilityId
      ) ?? null
    );
  };

export default FacilitySlice.reducer;
