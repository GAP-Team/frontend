import api from "../axios";

const userAPIs = {

    /* Authentication Routes */
    login: (data: any) => api.post('/auth/login', data),
  
}

export default userAPIs;