import BuildingsOverview from "@/screens/real-estate-owner/buildings/building-overview/BuildingsOverview";
import AuthGuard from "@/components/common/auth/AuthGuard";

export default function BuildingsPage(): JSX.Element {
  return (
    <AuthGuard
      fallbackTitle="Gebäude Zugriff verweigert"
      fallbackMessage="Sie müssen angemeldet und verifiziert sein, um auf die Gebäude zugreifen zu können."
    >
      <BuildingsOverview />
    </AuthGuard>
  );
}
