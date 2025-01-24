"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkIsLoggedIn, getIsUserVerified } from "@/utils/helperJWT";

export default function DashboardPage(): JSX.Element {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [isUserVerified, setIsUserVerified] = useState<Boolean>(false);

  useEffect(() => {
    checkRendering();
  }, []);

  const checkRendering = (): void => {
    if (!checkIsLoggedIn()) {
      router.push("/login");
    }
    if (checkIsLoggedIn() && getIsUserVerified() === "true") {
      setIsLoggedIn(true);
      setIsUserVerified(true);
    }
    if (checkIsLoggedIn() && getIsUserVerified() !== "true") {
      router.push("/user_verify");
    }
  };

  return (
    <>
      {isLoggedIn && isUserVerified && (
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            height: "80vh",
            backgroundColor: "#F1F3F4",
          }}
        >
          <h1>Service Provider Dashboard</h1>
        </div>
      )}
    </>
  );
}
