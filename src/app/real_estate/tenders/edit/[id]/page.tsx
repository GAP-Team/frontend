"use client";

import { useParams } from "next/navigation";
import RealStateUserLayout from "../../../page";
import TenderDetails from "@/screens/dashboard/tenders/tender_card/TenderDetails";

export default function TenderOverview(): JSX.Element {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  return (
    <RealStateUserLayout>
      <TenderDetails id={id} />
    </RealStateUserLayout>
  );
}
