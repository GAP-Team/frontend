import api from "../axios";

const buildingAPI = {
  /* Building Routes */
  // FIXME: Add proper types for the parameters and response
  create: (building: any): any => api.post("/buildings", building),
  update: (buildingId: string, data: any): any =>
    api.put(`/buildings/${buildingId}`, data),
  getFacilitiesOfBuilding: (buildingId: string): any =>
    api.get(`/buildings/${buildingId}/facilities`),
  delete: (buildingId: string): any => api.delete(`/buildings/${buildingId}`),
};

export default buildingAPI;
