"use client";
import { useParams } from "next/navigation";
import FacilityForm from "@/screens/real-estate-owner/facilities/facility-form/FacilityForm";
import AuthGuard from "@/components/common/auth/AuthGuard";

export default function EditFacilityPage(): JSX.Element {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  return (
    <AuthGuard
      fallbackTitle="Anlage bearbeiten - Zugriff verweigert"
      fallbackMessage="Sie müssen angemeldet und verifiziert sein, um eine Anlage bearbeiten zu können."
    >
      <FacilityForm facilityId={id} />
    </AuthGuard>
  );
}
