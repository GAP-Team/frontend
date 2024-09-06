import api from "../axios";

const s3APIs = {
  /* S3 Routes */
  upload: (data: any) => api.post("/files/upload", data),
  getFile: (key: string) =>
    api.get(`/files/download/${key}`, {
      responseType: "blob",
    }),
  delete: (key: any) => api.delete(`/files/delete/${key}`),
};

export default s3APIs;
