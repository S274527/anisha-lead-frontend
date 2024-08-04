import { backendClient } from "@/client/backendClient";
import { useGlobalLoader } from "@/hooks";

export const EDIT_LEAD_KEY = "edit-lead";

export const editLeadRequest = async (payload: any) => {
  useGlobalLoader.getState().setShowLoader(true);
  const withoutId = {...payload};
  delete withoutId.id;
  try {
    const response = await backendClient.post(
      `/admin/lead/edit/${payload.id}`,
      withoutId
    );
    return response;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};
