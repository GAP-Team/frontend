import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import userAPIs from "@/api/user";
import { Document } from "@/typings/types";

interface Company {
  name: string;
  phonenumber: number;
  numberOfEmployees?: number;
  address: Partial<UserAddress>;
  business?: Partial<UserBusiness>;
}
interface UserAddress {
  zip: number;
  state: string;
  street: string;
  country: string;
  houseNo: number;
  city: string;
}
export interface UserBusiness {
  businessType: string;
  registrationNumber: string;
  documents: Document[];
}

interface UserState {
  id: string;
  role: string;
  email: string;
  company: Partial<Company>;
  lastName: string;
  firstName: string;
  buildingIds: string[];
  manufacturerExperience: string;
  position: string;
  isActive: boolean;
}

interface ChangePassword {
  currentPassword: string;
  newPassword: string;
}

const initialState: UserState = {
  id: "",
  role: "",
  email: "",
  company: {
    name: "",
    phonenumber: 0,
    numberOfEmployees: 0,
    address: {
      zip: 0,
      state: "",
      street: "",
      country: "",
      houseNo: 0,
      city: "",
    },
    business: {
      businessType: "",
      registrationNumber: "",
      documents: [],
    },
  },
  lastName: "",
  firstName: "",
  buildingIds: [],
  manufacturerExperience: "",
  position: "",
  isActive: false,
};

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ id, data }: { id: string; data: Partial<UserState> }) => {
    const response = await userAPIs.updateUser(id, data);
    return response.data;
  }
);

export const updateUserPassword = createAsyncThunk(
  "user/updatePassword",
  async ({ id, data }: { id: string; data: Partial<ChangePassword> }) => {
    const response = await userAPIs.changePassword(id, data);
    return response.data;
  }
);
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async ({ id, currentPassword }: { id: string; currentPassword: string }) => {
    const response = await userAPIs.deleteUser(id, currentPassword);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
  },
});

export const { setUser } = userSlice.actions;

export const currentUser = (state: RootState): UserState => state.user;
export const currentUserId = (state: RootState): string => state.user.id;
export const currentUserEmail = (state: RootState): string => state.user.email;
export const currentUserCompany = (state: RootState): Company =>
  state.user.company;
export default userSlice.reducer;
