import Dashboard from "@/screens/dashboard/Dashboard";
import NewBuilding from "@/screens/dashboard/buildings/add_building_form/NewBuilding";

export default function AddBuildingFormPage() {
  return <Dashboard overrideComponent={<NewBuilding />} />;
}
