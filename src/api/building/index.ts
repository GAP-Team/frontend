import api from "../axios";

const buildingAPIs = {
  /* Building Routes */
  create: (data: any): any => api.post("/buildings", data),
  update: (buildingId: any, data: any): any =>
    api.put(`/buildings/${buildingId}`, data),
  getUserStatesCitiesFacilityTypes: (id: string): any =>
    api.get(`/buildings/${id}/get-user-state-city-facilitytype`),
  getBuildings: (
    userId: string,
    city: string,
    state: string,
    facilityType: string
  ): any =>
    api.get(
      `/buildings/${userId}?city=${city}&state=${state}&facilityType=${facilityType}`
    ),
};

export default buildingAPIs;
