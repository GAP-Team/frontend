import api from "../axios";

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
  applyContract: (contractId: string, applicationData: any): any =>
    api.post(`/contracts/${contractId}/application`, applicationData),
};
export default contractAPI;
