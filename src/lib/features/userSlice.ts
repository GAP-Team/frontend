"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

interface UserState {
  user: {
    id: string;
    company: {};
    role: string;
    email: string;
    buildingIds: [];
    firstName: string;
    lastName: string;
    manufacturerExperience: string;
  };
}

const initialState: UserState = {
  user: {
    id: "",
    role: "",
    email: "",
    company: {},
    lastName: "",
    firstName: "",
    buildingIds: [],
    manufacturerExperience: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user.id = action.payload?.user?.id;
      state.user.role = action.payload?.user?.role;
      state.user.email = action.payload?.user?.email;
      state.user.company = action.payload?.user?.company;
      state.user.lastName = action.payload?.user?.lastName;
      state.user.firstName = action.payload?.user?.firstName;
      state.user.buildingIds = action.payload?.user?.buildingIds;
      state.user.manufacturerExperience =
        action.payload?.user?.manufacturerExperience;
    },
    setUserBuildings: (state, action) => {
      state.user.buildingIds = action.payload;
    },
    setAllBuildingDetails: (state, action) => {
      state.user.buildingIds = action.payload;
    },
  },
});

export const { setUser, setUserBuildings, setAllBuildingDetails } =
  userSlice.actions;

export const currentUser = (state: RootState): any => state.user.user;
export const currentUserId = (state: RootState): string => state.user.user.id;
export const currentUserEmail = (state: RootState): string =>
  state.user.user.email;
export const currentUserCompany = (state: RootState): string =>
  state.user.user.company;
export const currentUserBuildings = (state: RootState): any =>
  state.user.user.buildingIds;
export const currentUserName = (state: RootState): string =>
  `${state.user.user.firstName} ${state.user.user.lastName}`;

export default userSlice.reducer;
