import api from "../axios";
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
};
export default contractAPI;
