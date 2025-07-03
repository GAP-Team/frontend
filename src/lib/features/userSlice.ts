import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import userAPIs from "@/api/user";
import emailAPIs from "@/api/email";
import { RootState } from "../store";
import { User, UserCompany, SendActivityEmailType } from "@/typings/types";

interface UserState {
  user: {
    id: string;
    role: string;
    email: string;
    company: Partial<UserCompany>;
    lastName: string;
    firstName: string;
    buildingIds: string[];
    manufacturerExperience: string;
    position: string;
    isActive: boolean;
    sendUserActivityEmailStatus?: boolean;
  };
  users: User[];
}

interface ChangePassword {
  currentPassword: string;
  newPassword: string;
}
interface ChangeEmail {
  email: string;
}

const initialState: UserState = {
  user: {
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
    sendUserActivityEmailStatus: false,
  },
  users: [],
};

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ id, data }: { id: string; data: Partial<ChangeEmail> }) => {
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

export const sendUserActivityEmail = createAsyncThunk(
  "user/sendActivityEmail",
  async ({ data }: { data: SendActivityEmailType }) => {
    const response = await emailAPIs.sendActivityEmail(data);
    return response.data;
  }
);

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await userAPIs.getUsers();
  return response.data;
});

export const activateUser = createAsyncThunk(
  "user/activateUser",
  async ({ id }: { id: string }) => {
    const response = await userAPIs.activateUser(id);
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
    builder.addCase(sendUserActivityEmail.fulfilled, (state, action) => {
      state.user.sendUserActivityEmailStatus = action.payload.status;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(activateUser.fulfilled, (state, action) => {
      state.user.isActive = action.payload.status === 200;
    });
  },
});

export const { setUser } = userSlice.actions;

export const isUserActive = (state: RootState): boolean => state.user.isActive;
export const currentUser = (state: RootState): UserState => state.user;

export default userSlice.reducer;
