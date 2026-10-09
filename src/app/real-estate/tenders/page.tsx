import { redirect } from "next/navigation";
import { ROUTES } from "@/utils/routes";

// The separate tenders overview is hidden: tenders are managed from a building's
// detail view.
export default function TendersPage(): JSX.Element {
  redirect(ROUTES.REAL_ESTATE.BUILDING.BUILDINGS);
}
