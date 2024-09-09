import Dashboard from "@/screens/dashboard/Dashboard";
import NewTender from "@/screens/dashboard/tenders/add_tender_form/NewTender";
import RealStateUserLayout from "../../page";

export default function AddTenderFormPage() {
  return (
    <RealStateUserLayout>
      <NewTender />
    </RealStateUserLayout>
  );
}
