"use client";
import { useParams } from "next/navigation";
import ContractDetails from "@/screens/service-provider/contracts/ContractDetails";

export default function ContractDetailsPage(): JSX.Element {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  return <ContractDetails id={id} />;
}
