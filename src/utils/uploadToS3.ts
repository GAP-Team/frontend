import s3APIs from "@/api/s3";
import customLogger from "./Logger/logger";

export const handleUploadDoc = async (ev: any): Promise<any> => {
  try {
    const file = ev?.target?.files[0];

    const formData = new FormData();
    formData.append("file", file);

    const res = await s3APIs.upload(formData);

    if (res) {
      return res.data;
    } else {
      return false;
    }
  } catch (error) {
    customLogger.error("Uploaded file erroe: ", error);
  }
};

export const handleUploadMultipleDoc = async (ev: any): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append("file", ev);

    const res = await s3APIs.upload(formData);

    if (res) {
      return res.data;
    } else {
      return false;
    }
  } catch (error) {
    customLogger.error("Multiple upload file erroe: ", error);
  }
};
