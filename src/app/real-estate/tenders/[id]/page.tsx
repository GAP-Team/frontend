"use client";

import { useParams } from "next/navigation";
import TenderDetails from "@/screens/real-estate-owner/tenders/tender-overview/TenderDetails";
import AuthGuard from "@/components/common/auth/AuthGuard";

export default function TenderOverview(): JSX.Element {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  return (
    <AuthGuard
      fallbackTitle="Ausschreibung Details - Zugriff verweigert"
      fallbackMessage="Sie müssen angemeldet und verifiziert sein, um Ausschreibungsdetails anzusehen."
    >
      <TenderDetails tenderId={id} />
    </AuthGuard>
  );
}
