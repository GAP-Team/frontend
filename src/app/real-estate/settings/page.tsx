import { ROUTES } from "@/utils/routes";
import { redirect } from "next/navigation";

export default function SettingsPage(): void {
  // Redirect to user_profile by default
  redirect(ROUTES.SETTINGS.USER_PROFILE);
}
