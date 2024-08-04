import { backendClient } from '@/client/backendClient';
import { TAdmin, TServerResponseWithPagination, TQueryData } from '@/types';
import { useGlobalLoader } from '@/hooks';

export const FETCH_ADMINS_KEY = 'list-admins';

export const fetchAdmins = async (payload: TQueryData) => {
  try {
    const response = await backendClient.get<
      TServerResponseWithPagination<TAdmin>
    >(
      `/admin/user/list?size=${payload?.size}&skip=${payload?.skip}&search=${
        payload?.search
      }&sorting=${payload?.sorting ?? ''}&trashOnly=${
        payload?.trashOnly ?? ''
      }`,
    );
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};
