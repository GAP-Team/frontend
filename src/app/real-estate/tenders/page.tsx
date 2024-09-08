import Dashboard from "@/screens/dashboard/Dashboard";
import Tenders from "@/screens/dashboard/tenders/Tenders";
import ReactStateUserLayout from "../page";

export default function TendersPage() {
  return (
    <ReactStateUserLayout>
      <Tenders />
    </ReactStateUserLayout>
  );
}
