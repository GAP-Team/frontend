"use client";
import Cookies from "js-cookie";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { currentUser } from "@/lib/features/userSlice";
import { getUserDashboard } from "@/utils/auth";
import GNavbar from "@/components/navigation/navbar/GNavbar";
import EmailVerificationScreen from "@/screens/EmailVerificationScreen";

// FIXME: renaming necessary as they do not have intuitive names
export default function UserMailVerification(): JSX.Element {
  const router = useRouter();
  const user = useSelector(currentUser);
  const [, setIsUserVerified] = useState<Boolean>(false);

  const postVerificationAction = (): void => {
    setIsUserVerified(true);
    const dashboardRoute = getUserDashboard();
    router.push(dashboardRoute);
    Cookies.set("isVerified", "true");
  };

  return (
    <>
      <section style={{ display: "flex", backgroundColor: "#F1F3F4" }}>
        <GNavbar />
      </section>
      <EmailVerificationScreen
        sendMail={false}
        newUserId={user?.id}
        newUserEmail={user?.email}
        newUserName={user?.firstName}
        postVerificationAction={postVerificationAction}
      />
    </>
  );
}
