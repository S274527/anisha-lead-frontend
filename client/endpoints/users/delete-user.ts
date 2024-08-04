import { backendClient } from '@/client/backendClient';
import { useGlobalLoader } from '@/hooks';

export const DELETE_USER_KEY = 'delete-user';

export const deleteUserRequest = async (ids: number) => {
  useGlobalLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.delete(`/admin/user/delete/${ids}`, {});
    return response;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};
