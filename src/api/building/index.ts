import api from "../axios";

const buildingAPIs = {
  /* Building Routes */
  create: (data: any): any => api.post("/buildings", data),
  update: (buildingId: any, data: any): any =>
    api.put(`/buildings/${buildingId}`, data),
  getBuildingFacilities: (id: string): any =>
    api.get(`/buildings/${id}/facilities`),
  delete: (buildingId: string): any => api.delete(`/buildings/${buildingId}`),
};

export default buildingAPIs;
