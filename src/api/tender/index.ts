import api from "../axios";

const tenderAPIs = {
  /* Tender Routes */
  create: (data: any): any => api.post("/tenders", data),
  delete: (tenderId: string): any => api.delete(`/tenders/${tenderId}`),
  update: (tenderId: string, tenderData: any): any =>
    api.put(`/tenders/${tenderId}`, tenderData),
  getAllContracts: (
    state: string,
    tenderTypes: string[],
    subcategory: string
  ): any =>
    api.get(
      `/tenders?state=${state}&subcategory=${subcategory}&tenderTypes=${tenderTypes}`
    ),
};

export default tenderAPIs;
