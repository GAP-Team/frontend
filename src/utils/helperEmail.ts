import userAPIs from "@/api/user";
import moment from "moment-timezone";
import ReactDOMServer from "react-dom/server";
import {
  emailTemplateGreetins,
  emailTemplateVerificationText,
  emailTemplateFoot,
  emailTemplateSubject,
} from "./Constants";

export const getNewVerificationCode = (): number => {
  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  return verificationCode;
};

export const sendVerificationEmail = async (
  name: string,
  email: string,
  userId: string,
  template: any,
  code: number
): Promise<any> => {
  const emailTemplate = renderEmailTemplate(name, code, template);

  const expiresAt = moment()
    .tz("Europe/Berlin")
    .add(15, "minutes")
    .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

  const emailText = `Hallo ${name}, ${emailTemplateGreetins} ${emailTemplateVerificationText} ${code} ${emailTemplateFoot}`;

  const readyEmailStructure = {
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

  const verificationTokenSaveQuery = {
    userId: userId,
    email: email,
    token: code,
    expiresAt: expiresAt,
  };

  const emailQurey = {
    emailStructure: readyEmailStructure,
    saveToken: verificationTokenSaveQuery,
  };

  const sendEmailStatus = await userAPIs.sendVerificationEmail(emailQurey);

  return sendEmailStatus;
};

const renderEmailTemplate = (
  name: string,
  code: number,
  template: any
): string => {
  const htmlString = ReactDOMServer.renderToStaticMarkup(template);
  return htmlString;
};
