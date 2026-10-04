import { useSearchParams } from "next/navigation";
import { RETURN_TO_PARAM, sanitizeReturnTo } from "@/utils/returnTo";

// Where a form/detail screen should go when it is closed: the page that opened
// it (e.g. a building's detail view), or null when it was opened directly.
export const useReturnTo = (): string | null =>
  sanitizeReturnTo(useSearchParams().get(RETURN_TO_PARAM));
