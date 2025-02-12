import { redirect } from "next/navigation";
export default function RealStatePage(): void {
  // Redirect to user_profile by default
  redirect("/real-estate");
}
