"use client";
import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

interface BuildingState {
  building: {
    id: string;
    address: {};
    documents: [];
    facilities: [];
    totalArea: number;
    contactPerson: [];
    serverLink: string;
    buildingName: string;
    buildingType: string;
    documentUploadType: string;
    buildingAbbreviation: string;
  };
  buildings: [];
  buildingIds: [];
}

const initialState: BuildingState = {
  building: {
    id: "",
    address: {},
    totalArea: 0,
    documents: [],
    facilities: [],
    serverLink: "",
    buildingName: "",
    buildingType: "",
    contactPerson: [],
    documentUploadType: "",
    buildingAbbreviation: "",
  },
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
