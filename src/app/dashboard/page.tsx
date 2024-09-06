"use client";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "@/screens/dashboard/Dashboard";
import { currentUser } from "@/lib/features/userSlice";
import GNavbar from "@/components/navigation/GNavbar/GNavbar";
import EmailVerification from "@/components/email/EmailVerification";
import { checkIsLoggedIn, checkIsUserVerified } from "@/utils/helperJWT";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";

export default function DashboardPage() {
  const router = useRouter();
  const user = useSelector(currentUser);

  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [isUserVerified, setIsUserVerified] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    if (!checkIsLoggedIn()) {
      router.push("/login");
    } else {
      setIsLoggedIn(true);
      const isUserVerified = checkIsUserVerified() === "true";
      setIsUserVerified(isUserVerified);
      setIsLoading(false);
    }
  }, []);

  const postVerificationAction = () => {
    setIsUserVerified(true);
    router.push("/dashboard");
    Cookies.set("isVerified", "true");
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // This makes it take the full viewport height
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {isLoggedIn && isUserVerified ? (
        <Dashboard />
      ) : (
        <>
          <section style={{ display: "flex", backgroundColor: "#F1F3F4" }}>
            <GNavbar />
          </section>
          <EmailVerification
            sendMail={true}
            newUserId={user?._id}
            newUserEmail={user?.email}
            newUserName={user?.firstName}
            postVerificationAction={postVerificationAction}
          />
        </>
      )}
    </>
  );
}
