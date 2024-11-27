import { redirect } from "next/navigation";
export default function SettingsPage(): void {
  // Redirect to user_profile by default
  redirect("/real_estate/settings/user_profile");
}
