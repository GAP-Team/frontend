import api from "../axios";

const s3APIs = {

    /* S3 Upload Routes */
    upload: (data: any) => api.post('/files/upload', data),
  
}

export default s3APIs;