import s3API from "@/api/s3";
import { Document } from "@/typings/types";

export const downloadDocument = async ({
  key,
  name,
}: Document): Promise<void> => {
  const file = await s3API.getFile(key);
  const url = window.URL.createObjectURL(
    new Blob([file.data], { type: "application/pdf" })
  );
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", name);
  link.click();
  window.URL.revokeObjectURL(url);
};
