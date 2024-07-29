import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

interface UserState {
  user: {
    _id: string,
    company: {},
    role: string,
    email: string,
    buildings: [],
    firstName: string,
    lastName: string,
    manufacturer_experience: string,
  };
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
};

const userSlice = createSlice({
  name: 'user',
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
      state.user.manufacturer_experience = action.payload?.user?.manufacturer_experience;
    },
  },
});

export const { setUser } = userSlice.actions;

export const currentUserId = (state: RootState) => state.user.user._id;
export const currentUserBuildings = (state: RootState) => state.user.user.buildings;

export default userSlice.reducer;
