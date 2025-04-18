import api from "../axios";

const emailAPIs = {
  sendVerificationEmail: (data: any): any =>
    api.post("/emails/send-verification-email", data),
  contactUs: (data: any): any => api.post("/emails/contact", data),
};

export default emailAPIs;
