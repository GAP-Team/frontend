import api from "../axios";

const buildingAPIs = {

    /* Building Routes */ 
    create: (data: any) => api.post('/buildings/create', data),
    getUserStatesCities: (id: string) => api.get(`/buildings/${id}/get-user-state-city`),
}

export default buildingAPIs;