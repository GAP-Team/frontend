import api from "../axios";

const facilityAPIs = {
  /* Facility Routes */
  getAllFacilitiesForOneBuilding: (buildingId: string): any => api.get(`/facilities/building/${buildingId}`),
};

export default facilityAPIs;
