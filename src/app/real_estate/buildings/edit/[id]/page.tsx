"use client";
import { useParams } from "next/navigation";
import NewBuilding from "@/screens/dashboard/buildings/add_building_form/NewBuilding";

export default function UpdatedBuilding(): JSX.Element {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  return (
    <NewBuilding id={id} />
  );
}
