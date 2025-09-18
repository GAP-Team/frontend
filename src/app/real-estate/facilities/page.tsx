import FacilityOverview from "@/screens/real-estate-owner/facilities/facility-overview/FacilityOverview";
import AuthGuard from "@/components/common/auth/AuthGuard";

export default function FacilitiesPage(): JSX.Element {
  return (
    <AuthGuard
      fallbackTitle="Anlagen Zugriff verweigert"
      fallbackMessage="Sie müssen angemeldet und verifiziert sein, um auf die Anlagen zugreifen zu können."
    >
      <FacilityOverview />
    </AuthGuard>
  );
}
