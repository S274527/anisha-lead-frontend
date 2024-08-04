'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useQuery } from "react-query";
import { Chart, Invoice } from './components';
import {
  fetchFaqs,
  FETCH_FAQS_KEY
} from "@/client/endpoints";
import { TQueryData } from "@/types";
import { DEFAULT_QUERY } from "@/constants";
import { useSession } from '@/hooks';

const defaultQuery = DEFAULT_QUERY;

const statuses = [{ id: 'Closed', name: 'Closed' }, { id: 'Callback', name: 'Callback' }, { id: 'Hold', name: 'Hold' }, { id: 'Enrolled', name: 'Enrolled' }, { id: 'Failed', name: 'Failed' }, { id: 'Follow up', name: 'Follow up' }, { id: 'Closed', name: 'Closed' }];

const ComponentsAnalytics = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [queryData, setQueryData] = useState<TQueryData>(defaultQuery);
  const { userType } = useSession();

  const { data: faqs } = useQuery(
    [FETCH_FAQS_KEY, queryData],
    () => fetchFaqs({ ...queryData, size: 1000 }),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );

  console.log('>>>>>>> faqs', faqs?.data);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href="/" className="text-primary hover:underline">
            Dashboard
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Analytics</span>
        </li>
      </ul>
      <div className="pt-5">
        <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statuses?.map((item) => {
            return (
              <Invoice status={item?.id} />
            )
          })}
        </div>
        <div className="mb-6 grid gap-6 lg:grid-cols-1">
          <Chart />
        </div>
        {faqs && faqs?.data?.length && userType === 'user' ? (
          <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <div className="panel sm:col-span-1 lg:col-span-1">
              <div className="mb-5 flex justify-between dark:text-white-light">
                <h5 className="text-lg font-semibold ">
                  FAQs
                </h5>
              </div>
              {faqs?.data?.map((item: any, index: number) => {
                return (
                  <>
                    <div className="grid gap-8 text-sm font-bold text-[#515365] sm:grid-cols-2 mb-5 mt-4">
                      <div className='flex'>
                        <div className='w-[30px]'>
                          <span className="text-lg text-[#f8538d]">{index + 1}.)</span>{' '}
                        </div>
                        <div>
                          <h1 className='text-lg mb-2'>{item?.title}</h1>
                          <p>{item?.description}</p>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </>
                )
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ComponentsAnalytics;