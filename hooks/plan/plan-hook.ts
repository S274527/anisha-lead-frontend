import {
  PlanPricingFormProps,
  PlanProps,
} from '@/constants/plan-pricing-form-props';
import axios from 'axios';
import { useSelector } from 'react-redux';

export function usePlan() {
  const token = useSelector((state: any) => state?.auth?.user?.accessToken);

  async function addPlan(data: PlanPricingFormProps) {
    try {
      const resp = await axios.post(
        ` ${process.env.NEXT_PUBLIC_API_URL}/admin/plans/add`,
        { plan: data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        },
      );
    } catch (error) {}
  }

  async function updatePlan(data: PlanProps) {
    try {
      const resp = await axios.post(
        ` ${process.env.NEXT_PUBLIC_API_URL}/admin/plans/update`,
        { plan: data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        },
      );
    } catch (error) {}
  }

  async function getPlan(id: string, setter: Function) {
    try {
      const resp = await axios.get<{ data: PlanProps }>(
        ` ${process.env.NEXT_PUBLIC_API_URL}/admin/plans/get/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        },
      );
      return setter(resp.data.data);
    } catch (error) {}
  }

  return { addPlan, updatePlan, getPlan };
}
