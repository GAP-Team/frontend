import { redirect } from "next/navigation";
import { ROUTES } from "@/utils/routes";
// import TendersOverview from "@/screens/real-estate-owner/tenders/tender-overview/TendersOverview";

// The separate tenders overview is temporarily hidden: tenders are managed from
// a building's detail view. Restore the original page below (and remove the
// redirect) to bring /real-estate/tenders back.
export default function TendersPage(): JSX.Element {
  redirect(ROUTES.REAL_ESTATE.BUILDING.BUILDINGS);
  // return <TendersOverview />;
}
