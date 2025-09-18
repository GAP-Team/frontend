import TenderForm from "@/screens/real-estate-owner/tenders/tender-form/TenderForm";
import AuthGuard from "@/components/common/auth/AuthGuard";

export default function AddTenderFormPage(): JSX.Element {
  return (
    <AuthGuard
      fallbackTitle="Ausschreibung erstellen - Zugriff verweigert"
      fallbackMessage="Sie müssen angemeldet und verifiziert sein, um eine Ausschreibung erstellen zu können."
    >
      <TenderForm />
    </AuthGuard>
  );
}
