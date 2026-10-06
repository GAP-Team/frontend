import api from "../axios";
import { Application } from "@/screens/service-provider/application/types";
import { TenderApplication } from "@/screens/real-estate-owner/tenders/tender-overview/types";

// FIXME: Add proper types for the parameters and response
const contractAPI = {
  getContracts: (
    states: string[],
    tenderTypes: string[],
    subcategories: string[]
  ): any =>
    api.get(
      `/contracts?states=${states}&subcategories=${subcategories}&tenderTypes=${tenderTypes}`
    ),

  getContractById: (id: string): any => api.get(`/contracts/${id}`),
  applyForContract: (
    contractId: string,
    application: Application
  ): Promise<any> =>
    api.post(`/contracts/${contractId}/applications`, application),
  getApplicationsForContract: (
    contractId: string
  ): Promise<{ data: TenderApplication[] }> =>
    api.get(`/contracts/${contractId}/applications`),
};
export default contractAPI;
