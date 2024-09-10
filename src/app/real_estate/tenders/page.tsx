import Dashboard from "@/screens/dashboard/Dashboard";
import Tenders from "@/screens/dashboard/tenders/Tenders";
import RealStateUserLayout from "../page";

export default function TendersPage() {
  return (
    <RealStateUserLayout>
      <Tenders />
    </RealStateUserLayout>
  );
}
