// EmailVerification.tsx
"use client";
import React, 
{ 
  useRef,
  useState,
  useEffect, 
} from "react";
import pino from "pino";
import Cookies from "js-cookie";
import moment from "moment-timezone";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import ReactDOMServer from "react-dom/server";
import { IoMailUnread } from "react-icons/io5";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import userAPIs from "@/api/user";
import GButton from "@/components/button/GButton";
import { currentUser } from "@/lib/features/userSlice";
import SuccessPage from "@/components/common/SuccessPage";
import EmailTemplate from "@/components/EmailTemplate/Template";
import { emailTemplateGreetins, emailTemplateVerificationText, emailTemplateFoot, emailTemplateSubject } from "@/utils/Constants";

const logger = pino();

interface EmailVerificationProps {
  sendMail: boolean;
  newUserId: string;
  newUserName: string;
  newUserEmail: string;
  postVerificationAction: () => void;
}

const EmailVerification = ({
  sendMail,
  newUserId,
  newUserName,
  newUserEmail,
  postVerificationAction
}: EmailVerificationProps) => {

  const user = useSelector(currentUser);

  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [verificationError, setVerificationError] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [isVerificationEmailSent, setIsVerificationEmailSent] = useState<boolean>(false);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendDisabled) {
      timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendDisabled]);

  // useEffect(() => {
  //   if (sendMail) {
  //     sendVerificationEmail(user?.firstName, user?.email, user?._id);
  //   }
  // }, [sendMail]);

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Move to the next input field if there is a next one
      if (index < verificationCode.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value === "") {
      // Allow backspace to clear the current field
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const code = verificationCode.join("");

      if (code != "") {
        let verificationQuery = {
          userId: newUserId,
          email: newUserEmail,
          token: code,
        };

        const res = await userAPIs.verifyEmail(verificationQuery);

        if (res?.data?.status) {
          setLoading(false);
          Cookies.remove("isVerified");

          if (sendMail) {
            postVerificationAction();            
          }else{
            setVerificationSuccess(true);
          }
          Cookies.set("isVerified", "true");
        }
      } else {
        setVerificationError(true);
      }
    } catch (error: any) {
      logger.error(
        "Unable to verify email, post request failed",
        error.name,
        error.message
      );
      setLoading(false);
      setVerificationError(true);
    }
  };

  const sendVerificationEmail = async (
    name: string,
    email: string,
    userId: string
  ) => {
    let verificationCode = Math.floor(100000 + Math.random() * 900000);
    const emailTemplate = renderEmailTemplate(name, verificationCode);

    let expiresAt = moment()
      .tz("Europe/Berlin")
      .add(15, "minutes")
      .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

    const emailText = `Dear ${name}, ${emailTemplateGreetins} ${emailTemplateVerificationText} ${verificationCode} ${emailTemplateFoot}`;

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
      token: verificationCode,
      expiresAt: expiresAt,
    };

    let emailQurey = {
      emailStructure: readyEmailStructure,
      saveToken: verificationTokenSaveQuery,
    };

    let sendEmailStatus = await userAPIs.sendVerificationEmail(emailQurey);

    if (sendEmailStatus.status == 201) {
      setIsVerificationEmailSent(true);
    }
  };

  const renderEmailTemplate = (name: string, verificationCode: number) => {
    const element = (
      <EmailTemplate name={name} verificationCode={verificationCode} />
    );
    const htmlString = ReactDOMServer.renderToStaticMarkup(element);
    return htmlString;
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedData = e.clipboardData.getData("Text").slice(0, 6);
    if (/^\d{6}$/.test(pastedData)) {
      const newCode = pastedData.split("");
      setVerificationCode(newCode);
      inputRefs.current[5]?.focus(); // Focus the last input field
    }
  };

  const handleResendCode = async () => {    
    setResendDisabled(true);
    sendVerificationEmail(newUserName, newUserEmail, newUserId);
  };

  return (
    <>
      {!verificationSuccess ? (
        <Grid item xs={12} md={12} lg={12} sx={styles.mainContainer}>
          <IoMailUnread
            color="#22A7F1"
            size={"8rem"}
            style={{ marginTop: "1rem" }}
          />
          <Typography variant="h3b" padding={"0.5rem"}>
            E-Mail-Verifizierung
          </Typography>
          <Typography
            variant="bodymr"
            style={{ maxWidth: "33rem", textAlign: "center", color: "#8D999C" }}
          >
            {`Bitte überprüfen Sie Ihren Posteingang auf den Bestätigungscode, der an Ihre E-Mail-Adresse gesendet wurde`}
          </Typography>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ marginTop: "1rem" }}
          >
            {verificationCode.map((digit, index) => (
              <Grid item key={index}>
                <TextField
                  variant="outlined"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  inputProps={{ sx: styles.digitBox, maxLength: 1 }}
                  inputRef={(el) => (inputRefs.current[index] = el)}
                  onPaste={handlePaste}
                />
              </Grid>
            ))}
          </Grid>
          <Typography
            color="error"
            sx={{ marginTop: "0.5rem", textAlign: "center" }}
          >
            {verificationError ? "Code ist falsch" : ""}
          </Typography>
          <GButton
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
            endIcon={loading && <CircularProgress color="gprimary" size={24} />}
            sx={styles.verifyBtn}
          >
            Verifizieren
          </GButton>
          {sendMail ? 
            <Button
              onClick={handleResendCode}
              variant="text"
              size="large"
              sx={styles.resendBtn}
            >
              Code erneut senden
            </Button>
          :
            <>
              <Typography
                variant="bodymr"
                marginTop="1rem"
                color="#8D999C"
                textAlign="center"
              >
                {resendDisabled ? `Resend code in ${resendTimer}s` : ""}
              </Typography>
              {!resendDisabled && (
                <Button
                  onClick={handleResendCode}
                  variant="text"
                  size="large"
                  sx={styles.resendBtn}
                >
                  Code erneut senden
                </Button>
              )}
            </>
          }
        </Grid>
      ) : (
        <SuccessPage
          title="Verifizierung erfolgreich!"
          description="Ihre E-Mail wurde erfolgreich verifiziert."
          buttonLabel="Zum Einloggen gehen"
          redirectUrl="/login"
        />
      )}
    </>
  );
};

export default EmailVerification;

const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  resendBtn: {
    marginTop: "1rem",
    color: "#0181C9",
    fontSize: "0.9rem",
    textTransform: "capitalize",
    fontWeight: 600,
  },
  verifyBtn: { marginTop: "2rem", fontSize: "1.2rem", padding: "0.8rem 4rem" },
  digitBox: { textAlign: "center", fontSize: "2rem", width: "3rem" },
};
