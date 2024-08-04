import { backendClient } from '@/client/backendClient';
import { TQueryData } from '@/types';
import { useGlobalLoader } from '@/hooks';

export const FETCH_PERMISSIONS_KEY = 'list-permissions';

export const fetchPermissions = async (payload: TQueryData) => {
  try {
    const response = await backendClient.get(
      `/admin/permissions/list?size=${payload?.size}&skip=${
        payload?.skip
      }&search=${payload?.search}&sorting=${payload?.sorting ?? ''}`,
    );
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};
