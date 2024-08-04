import { backendClient } from "@/client/backendClient";
import { useGlobalLoader } from "@/hooks";

export const GET_FAQ_KEY = "fetch-faq";

export const fetchFaq = async (id: string) => {
  useGlobalLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get(`/admin/faq/get/${id}`);
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};
