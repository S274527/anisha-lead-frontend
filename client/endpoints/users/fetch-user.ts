import { backendClient } from "@/client/backendClient";
import { useGlobalLoader } from "@/hooks";

export const GET_USER_KEY = "fetch-user";

export const fetchUser = async (id: string) => {
  useGlobalLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get(`/admin/user/get/${id}`);
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};
