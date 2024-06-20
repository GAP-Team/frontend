import api from "../axios";

const authAPIs = {

    /* Authentication Routes */
    login: (data: any) => api.post('/auth/login', data),
  
}

export default authAPIs;