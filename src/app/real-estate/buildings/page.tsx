import { Suspense } from "react";
import BuildingsOverview from "@/screens/real-estate-owner/buildings/building-overview/BuildingsOverview";

export default function BuildingsPage(): JSX.Element {
  return (
    <Suspense>
      <BuildingsOverview />
    </Suspense>
  );
}
