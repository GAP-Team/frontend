import { redirect } from "next/navigation";
import { ROUTES } from "@/utils/routes";
export default function ServiceProviderPage(): void {
  redirect(ROUTES.SERVICE_PROVIDER.DASHBOARD);
}
