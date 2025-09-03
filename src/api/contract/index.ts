import api from "../axios";
import { CreateResponseType } from "@/typings/types";
import { Application } from "@/screens/service-provider/application/types";

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
  ): Promise<CreateResponseType> =>
    api.post(`/contracts/${contractId}/applications`, application),
};
export default contractAPI;
