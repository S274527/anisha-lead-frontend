import { PlanProps } from "@/constants/plan-pricing-form-props";
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

export function usePlanList() {
  const [list, setList] = useState<PlanProps[]>([]);
  const token = useSelector((state: any) => state?.auth?.user?.accessToken);

  const { error, refetch } = useQuery(
    "adminPlanList",
    async () => {
      const response = await axios.get<{ list: PlanProps[] }>(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/plans/list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setList(data.list);
      },
    }
  );

  return { list, error, refetch };
}
