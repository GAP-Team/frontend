import api from "../axios";
import { SendActivityEmailType } from "@/typings/types";

// FIXME: Add proper types for the parameters and response
const emailAPI = {
  sendVerificationEmail: (userEmailPayload: any): any =>
    api.post("/emails/send-verification-email", userEmailPayload),
  contactUs: (contactPayload: any): any =>
    api.post("/emails/contact", contactPayload),
  sendActivityEmail: (userActivityPayload: SendActivityEmailType): any =>
    api.post("/emails/send-email", userActivityPayload),
  sendPasswordResetEmail: (data: { email: string }): any =>
    api.post("/emails/send-password-reset", data),
};

export default emailAPI;
