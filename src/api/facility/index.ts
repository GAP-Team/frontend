import api from "../axios";

const facilityAPIs = {
  /* Facility Routes */
  create: (data: any): any => api.post("/facilities", data),
};

export default facilityAPIs;
