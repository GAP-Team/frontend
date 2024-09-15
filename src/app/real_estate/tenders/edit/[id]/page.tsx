"use client";
import { useParams } from "next/navigation";
import RealStateUserLayout from "../../../page";
import NewTender from "@/screens/dashboard/tenders/add_tender_form/NewTender";

export default function TenderOverview(): JSX.Element {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  return (
    <RealStateUserLayout>
      <NewTender />
    </RealStateUserLayout>
  );
}
