import Tenders from "@/screens/dashboard/tenders/Tenders";
import RealStateUserLayout from "../page";

export default function TendersPage(): JSX.Element {
  return (
    <RealStateUserLayout>
      <Tenders />
    </RealStateUserLayout>
  );
}
