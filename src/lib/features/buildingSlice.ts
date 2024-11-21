"use client";
import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

interface BuildingState {
  buildings: [];
  buildingIds: [];
}

const initialState: BuildingState = {
  buildings: [],
  buildingIds: [],
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
