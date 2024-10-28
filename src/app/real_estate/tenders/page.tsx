import TendersOverview from "@/screens/dashboard/tenders/TendersOverview";
import RealStateUserLayout from "../page";

export default function TendersPage(): JSX.Element {
  return (
    <RealStateUserLayout>
      <TendersOverview />
    </RealStateUserLayout>
  );
}
