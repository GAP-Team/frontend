import api from "../axios";

const s3APIs = {

    // Test 1
    /* S3 Upload Routes */
    upload: (data: any) => api.post('/files/upload', data),
  
}

export default s3APIs;