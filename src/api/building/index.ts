import api from "../axios";

const buildingAPIs = {
  /* Building Routes */
  create: (data: any): any => api.post("/buildings", data),
  update: (buildingId: any, data: any): any =>
    api.put(`/buildings/${buildingId}`, data),
  getUserStatesCitiesFacilityTypes: (id: string): any =>
    api.get(`/users/${id}/filter-criteria`),
  getBuildings: (
    userId: string,
    city: string,
    state: string,
    facilityType: string
  ): any =>
    api.get(
      `/users/${userId}/buildings?city=${city}&state=${state}&facilityType=${facilityType}`
    ),
  getBuildingFacilities: (id: string): any =>
    api.get(`facilities/building/${id}`),
};

export default buildingAPIs;
