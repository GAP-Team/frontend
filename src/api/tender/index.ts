import api from "../axios";

const tenderAPIs = {
  /* Tender Routes */
  create: (data: any): any => api.post("/tenders/create", data),
};

export default tenderAPIs;
