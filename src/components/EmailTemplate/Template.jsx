import Divider from "@mui/material/Divider";

import { 
    emailSignature,
    emailTemplateFoot,
    emailTemplateGreetins,
    emailTemplateVerificationText,
} from "@/utils/Constants";

const EmailTemplate = ({name, verificationCode}) => (
    <html>
    <body>
        <p>Dear{name},</p>
        <p>{emailTemplateGreetins}</p>
        <p>{emailTemplateVerificationText} {verificationCode} </p>
        <p>{emailTemplateFoot}</p>
        <Divider />
        <p>{emailSignature}</p>
    </body>
    </html>
)

export default EmailTemplate;