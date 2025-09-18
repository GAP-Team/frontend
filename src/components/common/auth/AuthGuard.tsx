"use client";
import React, { ReactNode } from "react";
import { useAuth, AuthState } from "@/hooks/useAuth";
import FallbackPage from "@/components/common/pages/FallbackPage";
import NoAccessImage from "@images/no_access.png";
import { ROUTES } from "@/utils/routes";
import { Box, CircularProgress } from "@mui/material";

interface AuthGuardProps {
  children: ReactNode;
  fallbackMessage?: string;
  fallbackTitle?: string;
  fallbackButtonLabel?: string;
}

/**
 * Authentication guard component that wraps protected content.
 * This follows Next.js best practices by handling auth state client-side
 * without causing redirects during SSR/initial render.
 */
const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  fallbackMessage = "Sie müssen angemeldet und verifiziert sein, um auf diese Seite zugreifen zu können.",
  fallbackTitle = "Zugriff verweigert",
  fallbackButtonLabel = "Zur Anmeldung",
}) => {
  const { hasAccess, isLoading }: AuthState = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 9.125rem)",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Show no access page for unauthorized users
  if (!hasAccess) {
    return (
      <FallbackPage
        description={fallbackMessage}
        title={fallbackTitle}
        buttonLabel={fallbackButtonLabel}
        buttonLink={ROUTES.LOGIN}
        alt="No Access"
        image={NoAccessImage}
      />
    );
  }

  // Render protected content for authorized users
  return <>{children}</>;
};

export default AuthGuard;