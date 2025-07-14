// FIXME: Facility should not be imported from the screen, it should be imported from a common types file.
import { Facility } from "@/screens/real-estate-owner/facilities/facility-overview/types";
import api from "../axios";

const facilityAPI = {
  /* Facility Routes */
  // FIXME: Add proper types for the parameters and response
  create: (facility: Facility): Promise<{ id: string }> =>
    api.post("/facilities", facility),
  delete: (facilityId: string): any => api.delete(`/facilities/${facilityId}`),
  getTendersOfFacility: (facilityId: string): any =>
    api.get(`/facilities/${facilityId}/tenders`),
  update: (
    facilityId: string,
    facility: Partial<Facility>
  ): Promise<Facility> => api.put(`/facilities/${facilityId}`, facility),
};

export default facilityAPI;
