import { backendClient } from "@/client/backendClient";
import { useGlobalLoader } from "@/hooks";

export const LOGIN_KEY = "login";

export type TLogin = {
  email: string;
  password: string;
};

export const loginRequest = async (payload: TLogin) => {
  useGlobalLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post("/admin/login", payload);
    return response;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};
