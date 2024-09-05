import api from "../axios";

const buildingAPIs = {
  /* Building Routes */
  create: (data: any) => api.post("/buildings/create", data),
  getUserStatesCitiesFacilityTypes: (id: string) =>
    api.get(`/buildings/${id}/get-user-state-city-facilitytype`),
  getBuildings: (userId: string, city: string, state: string, facilityType: string) =>
    api.get(`/buildings/${userId}?city=${city}&state=${state}&facilityType=${facilityType}`),
};

export default buildingAPIs;
