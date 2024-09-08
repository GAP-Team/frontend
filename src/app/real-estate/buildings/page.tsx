import Buildings from "@/screens/dashboard/buildings/building_card/Buildings";
import Dashboard from "@/screens/dashboard/Dashboard";

import ReactStateUserLayout from "../page";

export default function BuildingsPage() {
  return (
    <ReactStateUserLayout>
      <Buildings />
    </ReactStateUserLayout>
  );
  // return <Dashboard overrideComponent={<Buildings />} />;
}
