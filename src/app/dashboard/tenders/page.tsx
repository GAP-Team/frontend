import Dashboard from "@/screens/dashboard/Dashboard";
import Tenders from "@/screens/dashboard/tenders/Tenders";

export default function TendersPage() {
  return (<Dashboard overrideComponent={<Tenders/>} />)
}

