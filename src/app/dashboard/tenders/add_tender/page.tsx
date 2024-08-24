import Dashboard from "@/screens/dashboard/Dashboard";
import NewTender from "@/screens/dashboard/tenders/add_tender_form/NewTender";

export default function AddTenderFormPage() {
  return <Dashboard overrideComponent={<NewTender />} />;
}
