import { redirect } from "next/navigation";
import { ROUTES } from "@/utils/routes";

// The separate facilities overview is hidden: facilities are managed from a building's
// detail view.
export default function FacilitiesPage(): JSX.Element {
  redirect(ROUTES.REAL_ESTATE.BUILDING.BUILDINGS);
}
