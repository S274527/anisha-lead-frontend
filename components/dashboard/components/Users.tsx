import React from 'react';
import { useQuery } from 'react-query';
import { fetchMetrics, GET_METRICS_KEY } from '@/client/endpoints';
import IconUsersGroup from '@/components/icon/icon-users-group';

export const Users = () => {
  const { data } = useQuery(
    [`${GET_METRICS_KEY}_Users`, 'Users'],
    () => fetchMetrics({ type: 'Users', range: '' }),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: 0,
    },
  );

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
      <div className="panel flex h-full items-center p-0">
        <div className="flex p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary dark:text-white-light">
            <IconUsersGroup className="h-5 w-5" />
          </div>
          <div className="font-semibold ltr:ml-3 rtl:mr-3">
            <p className="text-xl dark:text-white-light">{data?.active ?? 0}</p>
            <h5 className="text-xs text-[#506690]">Active Users</h5>
          </div>
        </div>
      </div>
      <div className="panel flex h-full items-center p-0">
        <div className="flex p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-danger/10 text-danger dark:bg-danger dark:text-white-light">
            <IconUsersGroup className="h-5 w-5" />
          </div>
          <div className="font-semibold ltr:ml-3 rtl:mr-3">
            <p className="text-xl dark:text-white-light">
              {data?.inactive ?? 0}
            </p>
            <h5 className="text-xs text-[#506690]">In Active Users</h5>
          </div>
        </div>
      </div>
    </div>
  );
};
