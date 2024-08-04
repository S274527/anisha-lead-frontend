import React, { useState } from 'react';
import Dropdown from '@/components/dropdown';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import IconTrendingUp from '@/components/icon/icon-trending-up';
import { useQuery } from 'react-query';
import { fetchMetrics, filters, GET_METRICS_KEY } from '@/client/endpoints';

export const Subscriptions = () => {
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
  const [range, setRange] = useState('This Month');

  const { data } = useQuery(
    [`${GET_METRICS_KEY}_Subscriptions`, range],
    () => fetchMetrics({ type: 'Subscriptions', range: range as any }),
    {
      refetchOnWindowFocus: false,
    },
  );

  return (
    <div className="panel ">
      <div className="mb-5 flex justify-between dark:text-white-light">
        <h5 className="text-lg font-semibold ">Users</h5>
        {filters?.length && (
          <div className="dropdown">
            <Dropdown
              offset={[0, 5]}
              placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
              btnClassName="hover:text-primary"
              button={
                <IconHorizontalDots className="text-black/70 hover:!text-primary dark:text-white/70" />
              }>
              <ul>
                {filters.map((e, i) => (
                  <li key={i}>
                    <button type="button" onClick={() => setRange(e)}>
                      {e}
                    </button>
                  </li>
                ))}
              </ul>
            </Dropdown>
          </div>
        )}
      </div>
      <div className="  text-3xl font-bold text-[#e95f2b]">
        <span>0</span>
        <span className="text-sm text-black ltr:mr-2 rtl:ml-2 dark:text-white-light">
          {" "}&nbsp;{range}
        </span>
        <IconTrendingUp className="inline text-success" />
      </div>
    </div>
  );
};
