"use client";
import { useParams } from "next/navigation";
import NewBuilding from "@/components/forms/building/NewBuilding";

export default function UpdatedBuilding(): JSX.Element {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  return <NewBuilding id={id} />;
}
