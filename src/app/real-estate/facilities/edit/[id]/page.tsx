"use client";
import { useParams } from "next/navigation";
import NewFacility from "@/components/forms/facility/NewFacility";

export default function EditFacilityPage(): JSX.Element {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  return <NewFacility facilityId={id} />;
}
