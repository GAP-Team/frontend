import CostSaving from "@/screens/real-estate-owner/cost-saving/CostSaving";
import AuthGuard from "@/components/common/auth/AuthGuard";

export default function CostSavingsPage(): JSX.Element {
  return (
    <AuthGuard
      fallbackTitle="Kosteneinsparung Zugriff verweigert"
      fallbackMessage="Sie müssen angemeldet und verifiziert sein, um auf die Kosteneinsparung zugreifen zu können."
    >
      <CostSaving />
    </AuthGuard>
  );
}
