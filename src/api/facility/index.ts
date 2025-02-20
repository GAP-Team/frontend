import api from "../axios";

const facilityAPIs = {
  /* Facility Routes */
  create: (data: any): any => api.post("/facilities", data),
  delete: (facilityId: string): any => api.delete(`/facilities/${facilityId}`),
  getFacilityTenders: (facilityId: string): any =>
    api.get(`/facilities/${facilityId}/tenders`),
  update: (facilityId: string, facilityData: any): any =>
    api.put(`/facilities/${facilityId}`, facilityData),
};

export default facilityAPIs;
