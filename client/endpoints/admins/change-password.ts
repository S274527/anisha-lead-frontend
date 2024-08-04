import { backendClient } from "@/client/backendClient";
import { useGlobalLoader } from "@/hooks";

export const CHANGE_ADMIN_PASSWORD_KEY = "change-admin-password";

export type TChangeAdminPassword = {
  old_password: string;
  new_password: string;
};

export const changeAdminPasswordRequest = async (
  payload: TChangeAdminPassword
) => {
  useGlobalLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post(
      `/admin/change-password`,
      payload
    );
    return response;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};
