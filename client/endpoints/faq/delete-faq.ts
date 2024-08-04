import { backendClient } from '@/client/backendClient';
import { useGlobalLoader } from '@/hooks';

export const DELETE_FAQ_KEY = 'delete-faq';

export const deleteFaqRequest = async (ids: number) => {
  useGlobalLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.delete(`/admin/faq/delete/${ids}`, {});
    return response;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};
