"use client";
import Cookies from "js-cookie";
import { useState } from "react";
import { ROUTES } from "@/utils/routes";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { currentUser } from "@/lib/features/userSlice";
import GNavbar from "@/components/navigation/GNavbar/GNavbar";
import EmailVerification from "@/components/email/EmailVerification";

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
      <EmailVerification
        sendMail={false}
        newUserId={user?.user?.id}
        newUserEmail={user?.user?.email}
        newUserName={user?.user?.firstName}
        postVerificationAction={postVerificationAction}
      />
    </>
  );
}
