import RealStateUserLayout from "../page";
import Buildings from "@/screens/dashboard/buildings/building_card/Buildings";

export default function BuildingsPage(): JSX.Element {
  return (
    <RealStateUserLayout>
      <Buildings />
    </RealStateUserLayout>
  );
}
