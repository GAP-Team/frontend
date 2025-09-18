"use client";
import { useParams } from "next/navigation";
import BuildingForm from "@/screens/real-estate-owner/buildings/building-form/BuildingForm";
import AuthGuard from "@/components/common/auth/AuthGuard";

export default function UpdatedBuildingPage(): JSX.Element {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  return (
    <AuthGuard
      fallbackTitle="Gebäude bearbeiten - Zugriff verweigert"
      fallbackMessage="Sie müssen angemeldet und verifiziert sein, um ein Gebäude bearbeiten zu können."
    >
      <BuildingForm id={id} />
    </AuthGuard>
  );
}
