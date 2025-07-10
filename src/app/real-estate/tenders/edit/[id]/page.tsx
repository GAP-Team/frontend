"use client";
import { useParams } from "next/navigation";
import NewTender from "@/screens/real_estate_owner/tenders/add_tender_form/NewTender";

export default function EditTenderPage(): JSX.Element {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  return <NewTender id={id} />;
}
