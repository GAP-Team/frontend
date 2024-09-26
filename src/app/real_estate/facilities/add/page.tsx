import RealStateUserLayout from "../../page";
import NewFacility from "@/screens/dashboard/facilities/add_facility_form/NewFacility";

export default function AddFacilityPage(): JSX.Element {
  return (
    <RealStateUserLayout>
      <NewFacility facilityId="" />
    </RealStateUserLayout>
  );
}
