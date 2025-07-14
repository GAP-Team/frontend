"use client";
import { useParams } from "next/navigation";
import BuildingForm from "@/screens/real-estate-owner/buildings/building-form/BuildingForm";

export default function UpdatedBuildingPage(): JSX.Element {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  return <BuildingForm id={id} />;
}
