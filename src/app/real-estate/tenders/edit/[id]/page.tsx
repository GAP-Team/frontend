"use client";
import { useParams } from "next/navigation";
import NewTender from "@/components/forms/tender/NewTender";

export default function TenderOverview(): JSX.Element {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  return <NewTender id={id} />;
}
