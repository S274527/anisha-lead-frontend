import { backendClient } from "@/client/backendClient";
import { useGlobalLoader } from "@/hooks";

export const GET_METRICS_KEY = "fetch-metrics";
export const filters = ['Last Month', 'This Month', 'Last Week', 'This Week']
type TProps = {
  type: string;
  range: string;
  status?: string;
};

export const fetchMetrics = async (payload: TProps) => {
  useGlobalLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get(
      `/admin/misc/dashboard-metrics?range=${payload.range}&type=${payload.type}&status=${payload?.status}`
    );
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};
