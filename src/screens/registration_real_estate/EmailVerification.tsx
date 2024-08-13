// EmailVerification.tsx
"use client";
import React, 
  { 
    useState, 
    useEffect 
  } 
from "react";
import pino from "pino";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { IoMailUnread } from "react-icons/io5";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from "@mui/material/CircularProgress";

import userAPIs from "@/api/user";
import GButton from "@/components/button/GButton";
import { currentUser } from "@/lib/features/userSlice";
import SuccessPage from "@/components/common/SuccessPage";

const logger = pino();

interface EmailVerificationProps{
  newUserId: string,
  newUserEmail: string,
  resendEmail:{}
}

const EmailVerification = ({ newUserId, newUserEmail, resendEmail }: EmailVerificationProps) => {

  const user = useSelector(currentUser);

  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [verificationCode, setVerificationCode] = useState(["","","","","","",]);

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

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
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
          token: code
        }
        
        const res = await userAPIs.verifyEmail(verificationQuery);
        
        if(res?.data?.status){
          setLoading(false);
          setVerificationSuccess(true);
          // onSuccess();
        }
      }else{
        console.log("Verification code cannot be blank...!!!");
        
      }
        
    } catch (error: any) {
      logger.error(
        "Unable to verify email, post request failed",
        error.name,
        error.message
      );
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResendDisabled(true);
    try {
      await userAPIs.reSendVerificationEmail(resendEmail);
    } catch (error: any) {
      logger.error(
        "Unable to resend code, post request failed",
        error.name,
        error.message
      );
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
                  inputProps={{ sx: styles.digitBox }}
                />
              </Grid>
            ))}
          </Grid>
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
        </Grid>
      ) : (
        <SuccessPage
          title="Verification Successful!"
          description="Your email has been verified successfully."
          buttonLabel="Go to Dashboard"
          redirectUrl="/dashboard"
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
