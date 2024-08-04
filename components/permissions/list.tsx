'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';
import { ListHeader, Table } from '@/components/common';
import { LINKS, DEFAULT_QUERY } from '@/constants';
import {
  fetchPermissions,
  FETCH_PERMISSIONS_KEY
} from '@/client/endpoints';
import { useGlobalLoader, useSession } from '@/hooks';
import { TQueryData } from '@/types';
import { getColumns } from './utils';

const defaultQuery = DEFAULT_QUERY;

export const List = () => {
  const router = useRouter();
  const [search, setSearch] = useState<any>('');
  const [queryData, setQueryData] = useState<TQueryData>(defaultQuery);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const { userType } = useSession();

  useEffect(() => {
    if(userType === 'user'){
      router.push('/dashboard');
    }
  }, [userType])

  const { data: permissions, refetch } = useQuery(
    [FETCH_PERMISSIONS_KEY, queryData],
    () => fetchPermissions(queryData),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: 0,
    },
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      search && useGlobalLoader.getState().setShowLoader(true);
      setQueryData({
        ...queryData,
        search,
      });
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleSearch = (param: string) => {
    setSearch(param);
  };

  const handlePageChange = (filters: TQueryData) => {
    setQueryData(filters);
  };

  const handleSortChange = (filters: TQueryData) => {
    setQueryData(filters);
  };

  const handleRowSelection = (rows: any) => {

  };

  return (
    <div>
      <ListHeader
        title="User Permissions"
        onSearch={handleSearch}
        onAddNew={() => router.push(LINKS.adminPermissions.add)}
        showAdd={false}
        search={search}
        selectedRows={selectedRows}
        isHardDelete={true}
        onMoveToTrash={() => console.log('void')}
      />
      <div className="panel relative mt-5 overflow-hidden border-0 p-0">
        <div className="table-responsive">
          <div className="datatables">
            <Table
              records={permissions && permissions.data}
              columns={getColumns({ refetch })}
              totalRecords={permissions?.total || 0}
              onPageChange={handlePageChange}
              onSortStatusChange={handleSortChange}
              filters={queryData}
              onRowSelection={handleRowSelection}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
