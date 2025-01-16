import api from "../axios";

const facilityAPIs = {
  /* Facility Routes */
  create: (data: any): any => api.post("/facilities", data),
  getFacilityTenders: (facilityId: string): any =>
    api.get(`/facilities/${facilityId}/tenders`),
  getFacility: (facilityId: string): any => api.get(`/facilities/${facilityId}`),
};

export default facilityAPIs;
