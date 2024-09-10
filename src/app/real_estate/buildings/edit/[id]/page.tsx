"use client";
import { useParams } from "next/navigation";

import RealStateUserLayout from "../../../page";
import NewBuilding from "@/screens/dashboard/buildings/add_building_form/NewBuilding";

export default function UpdatedBuilding() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  return (
    <RealStateUserLayout>
      <NewBuilding id={id} />
    </RealStateUserLayout>
  );
}
