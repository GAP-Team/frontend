"use client";
import { useParams } from "next/navigation";
import RealStateUserLayout from "@/app/real_estate/page";
import NewFacility from "@/screens/dashboard/facilities/add_facility_form/NewFacility";

export default function EditFacilityPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  return (
    <RealStateUserLayout>
      <NewFacility facilityId={id} />
    </RealStateUserLayout>
  );
}
