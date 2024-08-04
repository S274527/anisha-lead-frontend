import { backendClient } from "@/client/backendClient";
import { useGlobalLoader } from "@/hooks";

export const GET_LEAD_KEY = "fetch-lead";

export const fetchLead = async (id: string) => {
  useGlobalLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get(`/admin/lead/get/${id}`);
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};
