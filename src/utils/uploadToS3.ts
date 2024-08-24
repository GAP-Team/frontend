import s3APIs from "@/api/s3";

export const handleUploadDoc = async (ev: any) => {
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
    console.log("Uploaded file erroe: ", error);
  }
};

export const handleUploadMultipleDoc = async (ev: any) => {
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
