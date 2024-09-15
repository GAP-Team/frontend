"use client";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { currentUser } from "@/lib/features/userSlice";
import { getIsUserVerified } from "@/utils/helperJWT";
import GNavbar from "@/components/navigation/GNavbar/GNavbar";
import EmailVerification from "@/components/email/EmailVerification";

export default function UserMailVerification(): JSX.Element {
  const router = useRouter();
  const user = useSelector(currentUser);
  const [, setIsUserVerified] = useState<Boolean>(false);

  useEffect(() => {
    if (getIsUserVerified() === "true") {
      router.push("/real_estate/dashboard");
    }
  }, []);

  const postVerificationAction = () : void => {
    setIsUserVerified(true);
    router.push("/real_estate/dashboard");
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
