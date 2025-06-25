import { RootState } from "../store";
import contractAPI from "@/api/contract";
import { Contract } from "@/typings/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ContractState {
  contract: Contract;
  contracts: Contract[];
  loading: boolean;
  error: string | null;
}

const initialState: ContractState = {
  contract: {} as Contract,
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
    const response = await contractAPI.getContracts(
      states,
      tenderTypes,
      facilitySubcategories
    );
    return response.data;
  }
);

export const fetchContractById = createAsyncThunk(
  "contract/getContractById",
  async ({ id }: { id: string }) => {
    const response = await contractAPI.getContractById(id);
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
    builder
      .addCase(fetchContractById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContractById.fulfilled, (state, action) => {
        state.contract = action.payload;
        state.loading = false;
      })
      .addCase(fetchContractById.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch contract by ID";
        state.loading = false;
      });
  },
});

export const getAllContracts = (state: RootState): Contract[] =>
  state.contract.contracts;
export const getContractDetails = (state: RootState): Contract | null =>
  state.contract.contract;

export default contractSlice.reducer;
