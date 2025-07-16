"use client";
import { useParams } from "next/navigation";
import FacilityForm from "@/screens/real-estate-owner/facilities/facility-form/FacilityForm";

export default function EditFacilityPage(): JSX.Element {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  return <FacilityForm facilityId={id} />;
}
