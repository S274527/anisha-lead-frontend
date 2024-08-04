import { backendClient } from '@/client/backendClient';
import { TQueryData } from '@/types';
import { useGlobalLoader } from '@/hooks';

export const FETCH_LEADS_KEY = 'list-leads';

export const fetchLeads = async (payload: TQueryData) => {
  try {
    const response = await backendClient.get(
      `/admin/lead/list?size=${payload?.size}&skip=${
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

export const FETCH_CALLBACK_LEAD_KEY = 'FETCH_CALLBACK_LEAD_KEY';

export const fetchCallbackLeads = async () => {
  try {
    const response = await backendClient.get(
      `/admin/lead/callback-list`,
    );
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};
