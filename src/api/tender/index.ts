import api from "../axios";

const tenderAPIs = {
  /* Tender Routes */

  getTenders: (userId: string): any => api.get(`/users/${userId}/tenders`),
  create: (data: any): any => api.post("/tenders", data),
  delete: (tenderId: string): any => api.delete(`/tenders/${tenderId}`),
  update: (tenderId: any, tenderData: any): any =>
    api.put(`/tenders/${tenderId}`, tenderData),
};

export default tenderAPIs;
