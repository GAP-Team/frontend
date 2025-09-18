"use client";
import { useParams } from "next/navigation";
import TenderForm from "@/screens/real-estate-owner/tenders/tender-form/TenderForm";
import AuthGuard from "@/components/common/auth/AuthGuard";

export default function EditTenderPage(): JSX.Element {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  return (
    <AuthGuard
      fallbackTitle="Ausschreibung bearbeiten - Zugriff verweigert"
      fallbackMessage="Sie müssen angemeldet und verifiziert sein, um eine Ausschreibung bearbeiten zu können."
    >
      <TenderForm id={id} />
    </AuthGuard>
  );
}
