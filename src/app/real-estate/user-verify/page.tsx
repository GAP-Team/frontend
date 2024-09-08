"use client";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { currentUser } from "@/lib/features/userSlice";
import { checkIsUserVerified } from "@/utils/helperJWT";
import GNavbar from "@/components/navigation/GNavbar/GNavbar";
import EmailVerification from "@/components/email/EmailVerification";

export default function UserMailVerification() {
  const router = useRouter();
  const user = useSelector(currentUser);
  const [isUserVerified, setIsUserVerified] = useState<Boolean>(false);

  useEffect(() => {
    if (checkIsUserVerified() === "true") {
      router.push("/real-estate/dashboard");
    }
  }, []);

  const postVerificationAction = () => {
    setIsUserVerified(true);
    router.push("/real-estate/dashboard");
    Cookies.set("isVerified", "true");
  };

  return (
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
  );
}
