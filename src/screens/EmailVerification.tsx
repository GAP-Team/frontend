// EmailVerification.tsx
"use client";
import React, { useRef, useState, useEffect } from "react";
import Cookies from "js-cookie";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { IoMailUnread } from "react-icons/io5";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import userAPI from "@/api/user";
import emailAPI from "@/api/email";
import GButton from "@/components/inputs/button/GButton";
import SuccessPage from "@/components/common/pages/SuccessPage";

interface EmailVerificationProps {
  sendMail: boolean;
  newUserId: string;
  newUserName: string;
  newUserEmail: string;
  postVerificationAction: () => void;
}

const EmailVerificationScreen = ({
  sendMail,
  newUserId,
  newUserEmail,
  postVerificationAction,
}: EmailVerificationProps): JSX.Element => {
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
  const [, setIsVerificationEmailSent] = useState<boolean>(false);

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
    return (): void => clearInterval(timer);
  }, [resendDisabled]);

  const handleChange = (index: number, value: string): void => {
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

  const handleSubmit = async (): Promise<void> => {
    if (verificationCode.some((code) => code === "")) {
      setVerificationError(true);
      return;
    }

    setLoading(true);
    const code = verificationCode.join("");
    const verificationQuery = {
      userId: newUserId,
      email: newUserEmail,
      token: code,
    };

    try {
      const res = await userAPI.verifyEmailToken(verificationQuery);

      if (res?.data?.status) {
        handleVerificationSuccess();
      } else {
        handleVerificationFailure();
      }
    } catch (error) {
      console.error("Verification error:", error);
      handleVerificationFailure();
    }
  };

  const handleVerificationSuccess = (): void => {
    setLoading(false);
    Cookies.remove("isVerified");

    if (sendMail) {
      postVerificationAction();
    } else {
      setVerificationSuccess(true);
    }

    Cookies.set("isVerified", "true");
  };

  const handleVerificationFailure = (): void => {
    setLoading(false);
    setVerificationError(true);
  };

  const handlePaste = (e: React.ClipboardEvent): void => {
    const pastedData = e.clipboardData.getData("Text").slice(0, 6);
    if (/^\d{6}$/.test(pastedData)) {
      const newCode = pastedData.split("");
      setVerificationCode(newCode);
      inputRefs.current[5]?.focus(); // Focus the last input field
    }
  };

  const handleResendCode = async (): Promise<void> => {
    setResendDisabled(true);
    const userEmailPayload = { email: newUserEmail };
    const sendStatus = await emailAPI.sendVerificationEmail(userEmailPayload);

    if (sendStatus.status === 201) {
      setIsVerificationEmailSent(true);
    }
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
          {sendMail ? (
            <Button
              onClick={handleResendCode}
              variant="text"
              size="large"
              sx={styles.resendBtn}
            >
              Code erneut senden
            </Button>
          ) : (
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
          )}
        </Grid>
      ) : (
        <SuccessPage
          title="Verifizierung erfolgreich!"
          secondaryDescription="Ihre E-Mail wurde erfolgreich verifiziert."
          buttonLabel="Zum Einloggen gehen"
          redirectUrl="/login"
        />
      )}
    </>
  );
};

export default EmailVerificationScreen;

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
