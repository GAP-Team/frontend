import TendersOverview from "@/screens/real-estate-owner/tenders/tender-overview/TendersOverview";
import AuthGuard from "@/components/common/auth/AuthGuard";

export default function TendersPage(): JSX.Element {
  return (
    <AuthGuard
      fallbackTitle="Ausschreibungen Zugriff verweigert"
      fallbackMessage="Sie müssen angemeldet und verifiziert sein, um auf die Ausschreibungen zugreifen zu können."
    >
      <TendersOverview />
    </AuthGuard>
  );
}
