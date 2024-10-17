import CostSavingPage from "@/screens/dashboard/cost_saving/CostSavingPage";
import RealStateUserLayout from "../page";
import customLogger from "@/utils/logger";

export default function CostSavingsDashboard(): JSX.Element {
  customLogger.info("Info: Logging from the cost saving(server-side only).");
  customLogger.error("Error: Logging from the cost saving(server-side only).");
  return (
    <RealStateUserLayout>
      <CostSavingPage />
    </RealStateUserLayout>
  );
}
