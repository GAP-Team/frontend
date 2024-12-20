import api from "../axios";

const tenderAPIs = {
  /* Tender Routes */
  create: (data: any): any => api.post("/tenders", data),
  delete: (tenderId: string): any => api.delete(`/tenders/${tenderId}`),
  update: (tenderId: string | undefined, tenderData: any): any =>
    api.put(`/tenders/${tenderId}`, tenderData),
};

export default tenderAPIs;
