
import Dashboard from "@/screens/dashboard/Dashboard";
import NewBuilding from "@/screens/dashboard/buildings/add_building_form/NewBuilding";

export default function AddBuildingFormPage() {
  // const specialItem = {
  //   id: 3,
  //   icon: MdOutlineAddHomeWork,
  //   text: "Gebäude",
  //   component: <NewBuilding />
  // };
  
  return (<Dashboard overrideComponent={<NewBuilding/>} />)
}
