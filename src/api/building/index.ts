import api from "../axios";

const buildingAPIs = {

    /* Building Routes */
    create: (data: any) => api.post('/buildings/create', data),
    getBuildings: (userId: string) => api.get(`/buildings/${userId}`),
  
}

export default buildingAPIs;