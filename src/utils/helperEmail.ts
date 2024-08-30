import userAPIs from "@/api/user";
import moment from "moment-timezone";
import ReactDOMServer from "react-dom/server";
import { emailTemplateGreetins, emailTemplateVerificationText, emailTemplateFoot, emailTemplateSubject } from "./Constants";

export const getNewVerificationCode = () => {
    let verificationCode = Math.floor(100000 + Math.random() * 900000);
    return verificationCode;
}

export const sendVerificationEmail = async (
    name: string,
    email: string,
    userId: string,
    template: any,
    code: number,
  ) => {
    
    const emailTemplate = renderEmailTemplate(name, code, template);

    let expiresAt = moment()
      .tz("Europe/Berlin")
      .add(15, "minutes")
      .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

    const emailText = `Dear ${name}, ${emailTemplateGreetins} ${emailTemplateVerificationText} ${code} ${emailTemplateFoot}`;

    let readyEmailStructure = {
      source: "rihab@gap-pruefen.de",
      destination: {
        toAddresses: [email],
      },
      message: {
        subject: {
          data: emailTemplateSubject,
          charset: "UTF-8",
        },
        body: {
          text: {
            data: emailText,
            charset: "UTF-8",
          },
          html: {
            data: emailTemplate,
            charset: "UTF-8",
          },
        },
      },
    };

    let verificationTokenSaveQuery = {
      userId: userId,
      email: email,
      token: code,
      expiresAt: expiresAt,
    };

    let emailQurey = {
      emailStructure: readyEmailStructure,
      saveToken: verificationTokenSaveQuery,
    };

    let sendEmailStatus = await userAPIs.sendVerificationEmail(emailQurey);

    return sendEmailStatus;
};

const renderEmailTemplate = (name: string, code: number, template: any) => {
    const htmlString = ReactDOMServer.renderToStaticMarkup(template);
    return htmlString;
};