import api from "../axios";

const s3APIs = {
  /* S3 Routes */
  upload: (data: any): any => api.post("/files", data),
  getFile: (key: string): any =>
    api.get(`/files/${key}`, {
      responseType: "blob",
    }),
  delete: (key: any): any => api.delete(`/files/${key}`),
};

export default s3APIs;
