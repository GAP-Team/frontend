import { Tender } from "@/screens/dashboard/tenders/tender_card/types";
import api from "../axios";

const tenderAPI = {
  /* Tender Routes */
  // FIXME: Add proper types for the parameters and response
  create: (tender: Tender): Promise<{id: string}> => api.post("/tenders", tender),
  delete: (tenderId: string): any => api.delete(`/tenders/${tenderId}`),
  update: (tenderId: string, tender: Partial<Tender>): Promise<Tender> =>
    api.put(`/tenders/${tenderId}`, tender),
};

export default tenderAPI;
