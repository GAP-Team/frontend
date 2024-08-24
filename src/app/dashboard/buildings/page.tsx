import Buildings from "@/screens/dashboard/buildings/building_card/Buildings";
import Dashboard from "@/screens/dashboard/Dashboard";

export default function BuildingsPage() {
  return <Dashboard overrideComponent={<Buildings />} />;
}
