import { redirect } from "next/navigation";
import { ROUTES } from "@/utils/routes";
// import FacilityOverview from "@/screens/real-estate-owner/facilities/facility-overview/FacilityOverview";

// The separate facilities overview is temporarily hidden: facilities are managed
// from a building's detail view. Restore the original page below (and remove the
// redirect) to bring /real-estate/facilities back.
export default function FacilitiesPage(): JSX.Element {
  redirect(ROUTES.REAL_ESTATE.BUILDING.BUILDINGS);
  // return <FacilityOverview />;
}
