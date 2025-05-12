import { RootState } from "../store";
import contractAPIs from "@/api/contarct";
import { Contract } from "@/typings/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ContractState {
  contracts: Contract[];
  loading: boolean;
  error: string | null;
}

const initialState: ContractState = {
  contracts: [],
  loading: false as boolean,
  error: null as string | null,
};

export const fetchContracts = createAsyncThunk(
  "contract/getAllContracts",
  async ({
    states,
    tenderTypes,
    facilitySubcategories,
  }: {
    states: string[];
    tenderTypes: string[];
    facilitySubcategories: string[];
  }) => {
    const response = await contractAPIs.getAllContracts(
      states,
      tenderTypes,
      facilitySubcategories
    );
    return response.data;
  }
);

const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContracts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContracts.fulfilled, (state, action) => {
        state.contracts = action.payload;
        state.loading = false;
      })
      .addCase(fetchContracts.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch contracts";
        state.loading = false;
      });
  },
});

export const getAllContracts = (state: RootState): Contract[] =>
  state.contract.contracts;

export default contractSlice.reducer;
