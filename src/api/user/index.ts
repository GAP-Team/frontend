import api from "../axios";

const userAPIs = {

    /* User Registration Routes */
    register: (data: any) => api.post('/users/register', data),
  
}

export default userAPIs;