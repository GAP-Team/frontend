import api from "../axios";

const userAPIs = {

    /* User Registration Routes */
    getAllUser: () => api.get('/users'),
    register: (data: any) => api.post('/users/register', data),
    getUserDataById: (id: any) => api.get(`/users/by-id/${id}`),
    getUserData: (data: any) => api.post('/users/by-email', data),
    updateUser: (id: string, data: any) => api.patch(`/users/${id}`, data),
  
}

export default userAPIs;