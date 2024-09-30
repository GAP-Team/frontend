import CostSavingPage from "@/screens/dashboard/cost_saving/CostSavingPage";
import RealStateUserLayout from "../page";

export default function CostSavingsDashboard(): JSX.Element {
  return (
    <RealStateUserLayout>
      <CostSavingPage />
    </RealStateUserLayout>
  );
}
