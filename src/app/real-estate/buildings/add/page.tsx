import { Suspense } from "react";
import BuildingForm from "@/screens/real-estate-owner/buildings/building-form/BuildingForm";

export default function AddBuildingFormPage(): JSX.Element {
  return (
    <Suspense>
      <BuildingForm id="" />
    </Suspense>
  );
}
