import api from "../axios";
import { SendActivityEmailType } from "@/typings/types";

const emailAPIs = {
  sendVerificationEmail: (data: any): any =>
    api.post("/emails/send-verification-email", data),
  contactUs: (data: any): any => api.post("/emails/contact", data),
  sendActivityEmail: (data: SendActivityEmailType): any =>
    api.post("/emails/send-email", data),
};

export default emailAPIs;
