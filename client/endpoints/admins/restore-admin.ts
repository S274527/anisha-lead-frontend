import { backendClient } from "@/client/backendClient";
import { useGlobalLoader } from "@/hooks";

export const restoreAdminRequest = async (ids: number[]) => {
  useGlobalLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post(`/admin/user/restore`, { ids });
    return response;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};
