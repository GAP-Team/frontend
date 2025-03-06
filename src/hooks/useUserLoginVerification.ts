import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkIsLoggedIn, getIsUserVerified } from "@/utils/helperJWT";

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
      router.push("/user_verify");
    }
  };

  return { isLoggedIn, isUserVerified };
};
