"use client";

import { useParams } from "next/navigation";
import TenderDetails from "@/components/features/tenders/TenderDetails";

export default function TenderOverview(): JSX.Element {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  return <TenderDetails tenderId={id} />;
}
