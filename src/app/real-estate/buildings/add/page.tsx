import BuildingForm from "@/screens/real-estate-owner/buildings/building-form/BuildingForm";
import AuthGuard from "@/components/common/auth/AuthGuard";

export default function AddBuildingFormPage(): JSX.Element {
  return (
    <AuthGuard
      fallbackTitle="Gebäude erstellen - Zugriff verweigert"
      fallbackMessage="Sie müssen angemeldet und verifiziert sein, um ein Gebäude erstellen zu können."
    >
      <BuildingForm id="" />
    </AuthGuard>
  );
}
