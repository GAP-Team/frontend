import { redirect } from "next/navigation";
import { ROUTES } from "@/utils/routes";
export default function AdminPage(): void {
  redirect(ROUTES.ADMIN.DASHBOARD);
}
