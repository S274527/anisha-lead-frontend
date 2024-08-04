"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "react-query";
import { ListHeader, Table } from "@/components/common";
import { LINKS, DEFAULT_QUERY } from "@/constants";
import {
  fetchLeads,
  FETCH_LEADS_KEY,
  deleteLeadRequest,
} from "@/client/endpoints";
import { useGlobalLoader, useSession } from "@/hooks";
import { TQueryData } from "@/types";
import { getColumns } from "./utils";
import { showDeleteConfirmation, showMessage } from "@/utils";

const defaultQuery = DEFAULT_QUERY;

export const List = () => {
  const router = useRouter();
  const [search, setSearch] = useState<any>("");
  const [queryData, setQueryData] = useState<TQueryData>(defaultQuery);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const { session, userType } = useSession();
  const userPermission = session ? session?.user?.permissions : null;

  const { data: leads, refetch } = useQuery(
    [FETCH_LEADS_KEY, queryData],
    () => fetchLeads(queryData),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );

  const { mutate: deleteLead } = useMutation(deleteLeadRequest, {
    onSuccess: (res) => {
      refetch();
      showMessage(res.data.message);
      setSelectedRows([]);
    },
  });

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

  const handleSearch = (param: string) => {
    setSearch(param);
  };

  const handlePageChange = (filters: TQueryData) => {
    setQueryData(filters);
  };

  const handleSortChange = (filters: TQueryData) => {
    setQueryData(filters);
  };

  const handleRowSelection = (rows: any[]) => {
    if (rows?.length) {
      setSelectedRows(rows.map((row: any) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const trashConfirmation = async () => {
    const data = await showDeleteConfirmation(
      "Do you want to move selected leads to trash?"
    );
    if (data?.isConfirmed) {
      deleteLead(selectedRows[0]);
    }
  };

  return (
    <div>
      <ListHeader
        title="Leads"
        onSearch={handleSearch}
        showAdd={userType === 'admin' ? true : userPermission && userPermission[0]['add']}
        onAddNew={() => router.push(LINKS.leads.add)}
        search={search}
        showTrash={false}
        selectedRows={selectedRows}
        onMoveToTrash={trashConfirmation}
      />
      <div className="panel relative mt-5 overflow-hidden border-0 p-0">
        <div className="table-responsive">
          <div className="datatables">
            <Table
              records={leads && leads.data}
              columns={getColumns({ refetch })}
              totalRecords={leads?.total || 0}
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
