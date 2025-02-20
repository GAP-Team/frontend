import s3APIs from "@/api/s3";

export const handleUploadDoc = async (file: any): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await s3APIs.upload(formData);

    if (res) {
      return res.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Uploaded file erroe: ", error);
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
    console.log("Multiple upload file erroe: ", error);
  }
};

export const handleDeleteDoc = async (fileKey: string): Promise<boolean> => {
  try {
    const res = await s3APIs.delete(fileKey);
    return res?.data || false;
  } catch {
    return false;
  }
};
