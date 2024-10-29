import api from "../axios";

const buildingAPIs = {
  /* Building Routes */
  create: (data: any): any => api.post("/buildings", data),
  update: (buildingId: any, data: any): any =>
    api.put(`/buildings/${buildingId}`, data),
  getBuildingFacilities: (id: string): any =>
    api.get(`facilities/building/${id}`),
};

export default buildingAPIs;
