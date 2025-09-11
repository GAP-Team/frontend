import { RootState } from "../store";
import contractAPI from "@/api/contract";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Contract } from "@/screens/service-provider/contracts/types";
import { Application } from "@/screens/service-provider/application/types";

interface ContractState {
  currentContract: Contract;
  contracts: Contract[];
  loading: boolean;
  error: string | null;
}

const initialState: ContractState = {
  currentContract: {} as Contract,
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

// Update tender
export const applyForContract = createAsyncThunk(
  "contract/applyForContract",
  async ({
    contractId,
    applicationData,
  }: {
    contractId: string;
    applicationData: Application;
  }) => {
    const response = await contractAPI.applyForContract(
      contractId,
      applicationData
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
    builder
      .addCase(fetchContractById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContractById.fulfilled, (state, action) => {
        state.currentContract = action.payload;
        state.loading = false;
      })
      .addCase(fetchContractById.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch contract by ID";
        state.loading = false;
      });
    builder
      .addCase(applyForContract.pending, (state) => {
        state.loading = true;
      })
      .addCase(applyForContract.fulfilled, (state, action) => {
        // Find the contract that was applied to and update its applicationIds
        const contractIndex = state.contracts.findIndex(
          (contract) => contract.tenderId === action.meta.arg.contractId
        );
        if (contractIndex !== -1) {
          if (!state.contracts[contractIndex].applicationIds) {
            state.contracts[contractIndex].applicationIds = [];
          }
          // Only push if the ID doesn't already exist
          if (
            !state.contracts[contractIndex].applicationIds.includes(
              action.payload.id
            )
          ) {
            state.contracts[contractIndex].applicationIds.push(
              action.payload.id
            );
          }
        }
        state.loading = false;
      })
      .addCase(applyForContract.rejected, (state, action) => {
        state.error = action.error.message || "Failed to apply for contract";
        state.loading = false;
      });
  },
});

export const getAllContracts = (state: RootState): Contract[] =>
  state.contract.contracts;
export const getContract = (state: RootState): Contract =>
  state.contract.currentContract;

export default contractSlice.reducer;
