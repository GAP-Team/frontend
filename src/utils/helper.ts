import userAPIs from "@/api/user";
import { AddBuildingFormValues } from "@/screens/dashboard/buildings/add_building_form/types";

export async function getUserBuildingDetails(
  useId: string
): Promise<AddBuildingFormValues[]> {
  const allUpdatedBuildings = await userAPIs.getBuildings(useId, "", "", "");

  return allUpdatedBuildings.data;
}
