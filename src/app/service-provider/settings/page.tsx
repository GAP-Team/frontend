import { ROUTES } from "@/utils/routes";
import { redirect } from "next/navigation";

export default function ServiceProviderSettingsPage(): void {
  redirect(ROUTES.SERVICE_PROVIDER.SETTINGS.USER_PROFILE);
}
