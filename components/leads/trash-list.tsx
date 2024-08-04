'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from 'react-query';
import { ListHeader, Table } from '@/components/common';
import { LINKS, DEFAULT_QUERY } from '@/constants';
import {
  fetchAdmins,
  FETCH_ADMINS_KEY,
  deleteAdminForeverRequest,
  restoreAdminRequest,
} from '@/client/endpoints';
import { useGlobalLoader } from '@/hooks';
import { TQueryData, TAdmin } from '@/types';
import { getTrashColumns } from './utils';
import { showDeleteConfirmation, showMessage } from '@/utils';

const defaultQuery = DEFAULT_QUERY;

export const TrashList = () => {
  const router = useRouter();
  const [search, setSearch] = useState<any>('');
  const [queryData, setQueryData] = useState<TQueryData>(defaultQuery);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const { data: admins, refetch } = useQuery(
    [FETCH_ADMINS_KEY, queryData],
    () => fetchAdmins({ ...queryData, trashOnly: 'true' }),
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
        ...defaultQuery,
        search,
      });
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const { mutate: deleteAdmin } = useMutation(deleteAdminForeverRequest, {
    onSuccess: res => {
      refetch();
      showMessage(res.data.message);
      setSelectedRows([]);
    },
  });

  const { mutate: restoreAdmin } = useMutation(restoreAdminRequest, {
    onSuccess: res => {
      refetch();
      showMessage(res.data.message);
      setSelectedRows([]);
    },
  });

  const deleteConfirmation = async () => {
    const data = await showDeleteConfirmation(
      'Do you want to delete selected admin users?',
    );
    if (data?.isConfirmed) {
      deleteAdmin(selectedRows);
    }
  };

  const restoreConfirmation = async () => {
    const data = await showDeleteConfirmation(
      'Do you want to restore selected admin users?',
    );
    if (data?.isConfirmed) {
      restoreAdmin(selectedRows);
    }
  };

  const handleSearch = (param: string) => {
    setSearch(param);
  };

  const handlePageChange = (filters: TQueryData) => {
    setQueryData(filters);
  };

  const handleSortChange = (filters: TQueryData) => {
    setQueryData(filters);
  };

  const handleRowSelection = (rows: TAdmin[]) => {
    if (rows?.length) {
      setSelectedRows(rows.map((row: TAdmin) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  return (
    <div>
      <ListHeader
        title="Admins"
        onSearch={handleSearch}
        onAddNew={() => router.push(LINKS.users.add)}
        search={search}
        showAdd={false}
        selectedRows={selectedRows}
        onRestore={restoreConfirmation}
        onDelete={deleteConfirmation}
        isTrashList={true}
      />
      <div className="panel relative mt-5 overflow-hidden border-0 p-0">
        <div className="table-responsive">
          <div className="datatables">
            <Table
              records={admins && admins.data}
              columns={getTrashColumns({ refetch })}
              totalRecords={admins?.total || 0}
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
