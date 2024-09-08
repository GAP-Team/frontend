import Dashboard from "@/screens/dashboard/Dashboard";
import NewTender from "@/screens/dashboard/tenders/add_tender_form/NewTender";
import ReactStateUserLayout from "../../page";

export default function AddTenderFormPage() {
  return (
    <ReactStateUserLayout>
      <NewTender />
    </ReactStateUserLayout>
  );
}
