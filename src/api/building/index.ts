import api from "../axios";

const buildingAPIs = {

    /* Building Routes */
    create: (data: any) => api.post('/buildings/create', data),
  
}

export default buildingAPIs;