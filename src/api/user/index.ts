import api from "../axios";

const userAPIs = {

    /* Authentication Routes */
    register: (data: any) => api.post('/users/register', data),
  
}

export default userAPIs;