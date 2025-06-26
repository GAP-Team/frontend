"use client";
import Cookies from "js-cookie";
import { useState } from "react";
import { ROUTES } from "@/utils/routes";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { currentUser } from "@/lib/features/userSlice";
import GNavbar from "@/components/layout/navigation/GNavbar/GNavbar";
import EmailVerificationSection from "@/components/features/auth/verification/EmailVerification";

export default function UserMailVerification(): JSX.Element {
  const router = useRouter();
  const user = useSelector(currentUser);
  const [, setIsUserVerified] = useState<Boolean>(false);

  const postVerificationAction = (): void => {
    setIsUserVerified(true);
    router.push(ROUTES.REAL_ESTATE.DASHBOARD);
    Cookies.set("isVerified", "true");
  };

  return (
    <>
      <section style={{ display: "flex", backgroundColor: "#F1F3F4" }}>
        <GNavbar />
      </section>
      <EmailVerificationSection
        sendMail={false}
        newUserId={user?.id}
        newUserEmail={user?.email}
        newUserName={user?.firstName}
        postVerificationAction={postVerificationAction}
      />
    </>
  );
}
