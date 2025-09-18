import { useState, useEffect } from "react";
import { checkIsLoggedIn, getIsUserVerified } from "@/utils/auth";

export interface AuthState {
  isLoggedIn: boolean;
  isUserVerified: boolean;
  hasAccess: boolean;
  isLoading: boolean;
}

/**
 * Authentication hook that checks login status without automatic redirects.
 * This follows Next.js best practices by letting components handle their own rendering logic.
 */
export const useAuth = (): AuthState => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    isUserVerified: false,
    hasAccess: false,
    isLoading: true,
  });

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = checkIsLoggedIn();
      const isUserVerified = getIsUserVerified();
      const hasAccess = isLoggedIn && isUserVerified;

      setAuthState({
        isLoggedIn,
        isUserVerified,
        hasAccess,
        isLoading: false,
      });
    };

    // Check auth status on mount
    checkAuth();

    // Optional: Set up an interval to periodically check auth status
    // This handles cases where tokens expire or user logs out in another tab
    const interval = setInterval(checkAuth, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return authState;
};