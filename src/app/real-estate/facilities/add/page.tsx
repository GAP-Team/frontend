import { Suspense } from "react";
import FacilityForm from "@/screens/real-estate-owner/facilities/facility-form/FacilityForm";

export default function AddFacilityPage(): JSX.Element {
  return (
    <Suspense>
      <FacilityForm />
    </Suspense>
  );
}
