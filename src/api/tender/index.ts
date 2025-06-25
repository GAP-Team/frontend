import api from "../axios";

const tenderAPI = {
  /* Tender Routes */
  create: (tender: any): any => api.post("/tenders", tender),
  delete: (tenderId: string): any => api.delete(`/tenders/${tenderId}`),
  update: (tenderId: string, tender: any): any =>
    api.put(`/tenders/${tenderId}`, tender),
};

export default tenderAPI;
