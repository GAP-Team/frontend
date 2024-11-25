import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { AddBuildingFormValues } from "@/screens/dashboard/buildings/add_building_form/types";

interface BuildingState {
  buildings: AddBuildingFormValues[];
}

const initialState: BuildingState = {
  buildings: [],
};

const buildingSlice = createSlice({
  name: "building",
  initialState,
  reducers: {
    setUserBuildingDetails: (state, action) => {
      state.buildings = action?.payload;
    },
  },
});

export const { setUserBuildingDetails } = buildingSlice.actions;

export const getUserBuildings = (state: RootState): any =>
  state.building.buildings;

export default buildingSlice.reducer;
