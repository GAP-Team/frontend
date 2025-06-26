import { Facility } from "@/screens/dashboard/facilities/facility_card/types";
import api from "../axios";

const facilityAPI = {
  /* Facility Routes */
  // FIXME: Add proper types for the parameters and response
  create: (facility: Facility): Promise<{ id: string }> =>
    api.post("/facilities", facility),
  delete: (facilityId: string): any => api.delete(`/facilities/${facilityId}`),
  getTendersOfFacility: (facilityId: string): any =>
    api.get(`/facilities/${facilityId}/tenders`),
  update: (facilityId: string, facility: Partial<Facility>): Promise<Facility> =>
    api.put(`/facilities/${facilityId}`, facility),
};

export default facilityAPI;
