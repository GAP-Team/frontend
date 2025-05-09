import api from "../axios";

const tenderAPIs = {
  /* Tender Routes */
  create: (data: any): any => api.post("/tenders", data),
  delete: (tenderId: string): any => api.delete(`/tenders/${tenderId}`),
  update: (tenderId: string, tenderData: any): any =>
    api.put(`/tenders/${tenderId}`, tenderData),
  getAllContracts: (
    states: string[],
    tenderTypes: string[],
    subcategories: string[]
  ): any =>
    api.get(
      `/tenders?states=${states}&subcategories=${subcategories}&tenderTypes=${tenderTypes}`
    ),
};

export default tenderAPIs;
