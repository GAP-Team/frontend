import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkIsLoggedIn, getIsUserVerified } from "@/utils/auth";
import { ROUTES } from "@/utils/routes";

export const useLogin = (): {
  isLoggedIn: boolean;
  isUserVerified: boolean;
} => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isUserVerified, setIsUserVerified] = useState<boolean>(false);

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
      router.push(ROUTES.USER_VERIFY);
    }
  };

  return { isLoggedIn, isUserVerified };
};
