"use client";
import { useParams } from "next/navigation";
import NewBuilding from "@/screens/real-estate-owner/buildings/add-building-form/NewBuilding";

export default function UpdatedBuildingPage(): JSX.Element {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  return <NewBuilding id={id} />;
}
