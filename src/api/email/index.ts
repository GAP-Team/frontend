import api from "../axios";
import { SendActivityEmailType } from "@/typings/types";

const emailAPI = {
  sendVerificationEmail: (userEmailPayload: any): any =>
    api.post("/emails/send-verification-email", userEmailPayload),
  contactUs: (contactPayload: any): any =>
    api.post("/emails/contact", contactPayload),
  sendActivityEmail: (userActivityPayload: SendActivityEmailType): any =>
    api.post("/emails/send-email", userActivityPayload),
};

export default emailAPI;
