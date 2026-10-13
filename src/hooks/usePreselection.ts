import { useSearchParams } from "next/navigation";
import { BUILDING_PARAM, FACILITY_PARAM, Preselection } from "@/utils/returnTo";

// The object / facility a create form was opened for (see withPreselection).
// Empty when the form was opened without one.
export const usePreselection = (): Required<Preselection> => {
  const params = useSearchParams();
  return {
    buildingId: params.get(BUILDING_PARAM) ?? "",
    facilityId: params.get(FACILITY_PARAM) ?? "",
  };
};
