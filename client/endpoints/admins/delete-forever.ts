import { backendClient } from "@/client/backendClient";
import { useGlobalLoader } from "@/hooks";

export const deleteAdminForeverRequest = async (ids: number[]) => {
  useGlobalLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.delete(
      `/admin/user/delete-permanant`,
      { data: { ids } }
    );
    return response;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};
