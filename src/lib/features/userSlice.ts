"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

interface UserState {
  user: {
    _id: string;
    company: {};
    role: string;
    email: string;
    buildings: [];
    firstName: string;
    lastName: string;
    manufacturer_experience: string;
  };
  buildings: [];
}

const initialState: UserState = {
  user: {
    _id: "",
    role: "",
    email: "",
    company: {},
    lastName: "",
    firstName: "",
    buildings: [],
    manufacturer_experience: "",
  },
  buildings: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user._id = action.payload?.user?._id;
      state.user.role = action.payload?.user?.role;
      state.user.email = action.payload?.user?.email;
      state.user.company = action.payload?.user?.company;
      state.user.lastName = action.payload?.user?.lastName;
      state.user.firstName = action.payload?.user?.firstName;
      state.user.buildings = action.payload?.user?.buildings;
      state.user.manufacturer_experience =
        action.payload?.user?.manufacturer_experience;
    },
    setUserBuildings: (state, action) => {
      state.user.buildings = action.payload;
    },
    setAllBuildingDetails: (state, action) => {
      state.buildings = action.payload;
    },
  },
});

export const { setUser, setUserBuildings, setAllBuildingDetails } =
  userSlice.actions;

export const currentUser = (state: RootState) => state.user.user;
export const currentUserId = (state: RootState) => state.user.user._id;
export const currentUserEmail = (state: RootState) => state.user.user.email;
export const allBuildingDetails = (state: RootState) => state.user.buildings;
export const currentUserCompany = (state: RootState) => state.user.user.company;
export const currentUserBuildings = (state: RootState) =>
  state.user.user.buildings;
export const currentUserName = (state: RootState) =>
  `${state.user.user.firstName} ${state.user.user.lastName}`;

export default userSlice.reducer;
