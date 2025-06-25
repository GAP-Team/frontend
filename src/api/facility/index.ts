import api from "../axios";

const facilityAPI = {
  /* Facility Routes */
  create: (facility: any): any => api.post("/facilities", facility),
  delete: (facilityId: string): any => api.delete(`/facilities/${facilityId}`),
  getTendersOfFacility: (facilityId: string): any =>
    api.get(`/facilities/${facilityId}/tenders`),
  update: (facilityId: string, facility: any): any =>
    api.put(`/facilities/${facilityId}`, facility),
};

export default facilityAPI;
