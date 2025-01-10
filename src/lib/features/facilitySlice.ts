import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Facility } from "@/screens/dashboard/facilities/facility_card/types";

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

const FacilitySlice = createSlice({
  name: "facility",
  initialState,
  reducers: {
    setFacilities: (state, action: PayloadAction<Facility[]>) => {
      state.facilities = action.payload;
    },
  },
});

export const { setFacilities } = FacilitySlice.actions;

export const getAllFacilities = (state: RootState): Facility[] =>
  state.facility.facilities;

export default FacilitySlice.reducer;
