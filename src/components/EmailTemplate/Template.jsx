import { 
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
    </body>
    </html>
)

export default EmailTemplate;