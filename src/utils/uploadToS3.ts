import s3API from "@/api/s3";

export const handleUploadDoc = async (file: any): Promise<any> => {
  try {
    // TODO: why we need to use FormData here?
    const formData = new FormData();
    formData.append("file", file);

    const res = await s3API.upload(formData);

    // FIXME: what is the return type of this function?
    if (res) {
      return res.data;
    } else {
      return false;
    }
  } catch (error) {
    // FIXME: Handle error properly
    console.log("Uploaded file error: ", error);
  }
};

export const handleUploadMultipleDoc = async (ev: any): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append("file", ev);

    const res = await s3API.upload(formData);

    // FIXME: what is the return type of this function?
    if (res) {
      return res.data;
    } else {
      return false;
    }
  } catch (error) {
    // FIXME: Handle error properly
    console.log("Multiple upload file error: ", error);
  }
};

export const handleDeleteDoc = async (fileKey: string): Promise<boolean> => {
  try {
    const res = await s3API.delete(fileKey);
    return res?.data || false;
  } catch {
    return false;
  }
};
