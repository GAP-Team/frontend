import api from "../axios";
import { Application } from "@/typings/types";

// FIXME: Add proper types for the parameters and response
const contractAPI = {
  getContracts: (
    states: string[],
    tenderTypes: string[],
    subcategories: string[]
  ): any =>
    api.get(
      `/contracts?states=${states}&subcategories=${subcategories}&tenderTypes=${tenderTypes}`
    ),

  getContractById: (id: string): any => api.get(`/contracts/${id}`),
  applyForContract: (contractId: string, applicationData: Application): any =>
    api.post(`/contracts/${contractId}/applications`, applicationData),
};
export default contractAPI;
