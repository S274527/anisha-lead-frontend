import { backendClient } from "@/client/backendClient";
import { useGlobalLoader } from "@/hooks";

export const EDIT_PROFILE_KEY = "edit-profile";

export type TEditAdminProfile = {
  full_name: string;
  address: string;
  contact_number: string;
  phone_code: string;
};

export const editAdminProfileRequest = async (payload: TEditAdminProfile) => {
  useGlobalLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post(
      `/admin/edit-profile`,
      payload
    );
    return response;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};
