import api from "../axios";

const s3APIs = {
  /* S3 Routes */
  upload: (data: any)  : any => api.post("/files/upload", data),
  getFile: (key: string)  : any =>
    api.get(`/files/download/${key}`, {
      responseType: "blob",
    }),
  delete: (key: any)  : any => api.delete(`/files/delete/${key}`),
};

export default s3APIs;
