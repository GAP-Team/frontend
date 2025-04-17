import api from "../axios";

const emailAPIs = {
    sendVerificationEmail: (data: any): any =>
        api.post("/emails/send-verificaiton-email", data),
    contactUs: (data: any): any => api.post("/emails/contact", data),
}

export default emailAPIs;