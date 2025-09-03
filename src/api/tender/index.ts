// FIXME: Tender should not be imported from the screen, it should be imported from a common types file.
import api from "../axios";
import {
  Tender,
  UpdateTenderResponse,
} from "@/screens/real-estate-owner/tenders/tender-overview/types";

const tenderAPI = {
  /* Tender Routes */
  // FIXME: Add proper types for the parameters and response
  create: (tender: Tender): Promise<{ id: string }> =>
    api.post("/tenders", tender),
  delete: (tenderId: string): any => api.delete(`/tenders/${tenderId}`),
  update: (
    tenderId: string,
    tender: Partial<Tender>
  ): Promise<UpdateTenderResponse> => api.put(`/tenders/${tenderId}`, tender),
};

export default tenderAPI;
