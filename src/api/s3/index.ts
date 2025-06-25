import api from "../axios";

const s3API = {
  /* S3 Routes */
  upload: (file: any): any => api.post("/files", file),
  getFile: (key: string): any =>
    api.get(`/files/${key}`, {
      responseType: "blob",
    }),
  delete: (key: any): any => api.delete(`/files/${key}`),
};

export default s3API;
