import Divider from "@mui/material/Divider";

import {
  emailSignature1,
  emailSignature2,
  emailSignature3,
  emailSignature4,
  emailTemplateFoot,
  emailTemplateGreetins,
  emailTemplateVerificationText,
} from "@/utils/Constants";

const EmailTemplate = ({
  name,
  verificationCode,
}: {
  name: string;
  verificationCode: string;
}): any => (
  <html>
    <body>
      <p>Hallo {name},</p>
      <p>{emailTemplateGreetins}</p>
      <p>
        {emailTemplateVerificationText} <b> {verificationCode} </b>
      </p>
      <p>{emailTemplateFoot}</p>
      <Divider />
      <p>{emailSignature1}</p>
      <p>{emailSignature2}</p>
      <p>{emailSignature3}</p>
      <p>{emailSignature4}</p>
    </body>
  </html>
);

export default EmailTemplate;
