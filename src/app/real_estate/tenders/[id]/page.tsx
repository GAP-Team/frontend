"use client";

import { useParams } from "next/navigation";
import RealStateUserLayout from "@/app/real_estate/page";
import TenderDetails from "@/screens/dashboard/tenders/tender_card/TenderDetails";

export default function TenderOverview() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  return (
    <RealStateUserLayout>
      <TenderDetails id={id} />
    </RealStateUserLayout>
  );
}
