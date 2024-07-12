import api from "../axios";

const userAPIs = {

    /* User Registration Routes */
    register: (data: any) => api.post('/users/register', data),
    getUserData: (data: any) => api.post('/users/by-email', data),
    getAllUser: () => api.get('/users')
  
}

export default userAPIs;