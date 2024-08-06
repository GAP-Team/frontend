import api from "../axios";

const authAPIs = {

    /* Authentication Routes */
    login: (data: any) => api.post('/auth/login', data),
    logout: (userId: string) => api.post('/auth/logout', userId),
  
}

export default authAPIs;