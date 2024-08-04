import { backendClient } from "@/client/backendClient";
import { useGlobalLoader } from "@/hooks";

export const ADD_ADMIN_KEY = "add-admin";

export type TAddAdmin = {
  email: string;
  password: string;
  full_name: string;
  contact_number: string;
  role: string;
  address: string;
  active: string;
};

export const addAdminRequest = async (payload: TAddAdmin) => {
  useGlobalLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post("/admin/user/add", payload);
    return response;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};
