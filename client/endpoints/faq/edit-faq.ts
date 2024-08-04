import { backendClient } from "@/client/backendClient";
import { useGlobalLoader } from "@/hooks";

export const EDIT_FAQ_KEY = "edit-faq";

export const editFaqRequest = async (payload: any) => {
  useGlobalLoader.getState().setShowLoader(true);
  const withoutId = {...payload};
  delete withoutId.id;
  try {
    const response = await backendClient.post(
      `/admin/faq/edit/${payload.id}`,
      withoutId
    );
    return response;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};
