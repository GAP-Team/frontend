import api from "../axios";

const facilityAPIs = {
  /* Facility Routes */
  create: (data: any): any => api.post("/facilities", data),
  getFacilityTenders: (facilityId: string): any =>
    api.get(`/facilities/${facilityId}/tenders`),
  getFacility: (facilityId: string): any =>
    api.get(`/facilities/${facilityId}`),
  update: (facilityId: string, data: any): any =>
    api.put(`/facilities/${facilityId}`, data),
};

export default facilityAPIs;
