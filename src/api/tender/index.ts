import api from "../axios";

const tenderAPIs = {
  /* Tender Routes */

  getTenders: (userId: string): any => api.get(`/users/${userId}/tenders`),
  create: (data: any): any => api.post("/tenders", data),
  delete: (tenderId: string): any => api.delete(`/tenders/${tenderId}`),
};

export default tenderAPIs;
