import FacilityForm from "@/screens/real-estate-owner/facilities/facility-form/FacilityForm";
import AuthGuard from "@/components/common/auth/AuthGuard";

export default function AddFacilityPage(): JSX.Element {
  return (
    <AuthGuard
      fallbackTitle="Anlage erstellen - Zugriff verweigert"
      fallbackMessage="Sie müssen angemeldet und verifiziert sein, um eine Anlage erstellen zu können."
    >
      <FacilityForm />
    </AuthGuard>
  );
}
