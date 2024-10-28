import api from "../axios";

const tenderAPIs = {
  /* Tender Routes */
  create: (data: any): any => api.post("/tenders/create", data),
  getTenders: (userId: string): any => api.get(`/users/${userId}/tenders`),
};

export default tenderAPIs;
