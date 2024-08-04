"use client";
import React, { useState, useEffect } from "react";
import { DataTable } from "mantine-datatable";
import { DEFAULT_SORTING, DEFAULT_QUERY } from "@/constants";
import { TQueryData } from "@/types";

const PAGE_SIZES = [DEFAULT_QUERY.size, 20, 30, 50, 100];

type TProps = {
  records: any;
  columns: any;
  totalRecords: number;
  filters: TQueryData;
  onPageChange: (p: TQueryData) => void;
  onSortStatusChange: (p: TQueryData) => void;
  onRowSelection: (p: any) => void;
};

export const Table = ({
  records,
  columns,
  totalRecords,
  filters,
  onPageChange,
  onSortStatusChange,
  onRowSelection,
}: TProps) => {
  const [sortStatus, setSortStatus] = useState(DEFAULT_SORTING);
  const [page, setPage] = useState(1);
  const [selectedRecords, setSelectedRecords] = useState<any>([]);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  const handleSortChange = (p: {
    columnAccessor: string;
    direction: string;
  }) => {
    setSortStatus(p as any);
    onSortStatusChange({
      ...filters,
      sorting: `${p.columnAccessor} ${p.direction.toUpperCase()}`,
    });
  };

  const handlePageChange = (event: number) => {
    setPage(event);
    onPageChange({
      ...filters,
      skip: (event - 1) * filters?.size,
    });
  };

  const handlePageSizeChange = (event: number) => {
    setPageSize(event);
    onPageChange({
      ...filters,
      size: event,
      skip: 0,
    });
  };

  const handleRowSelection = (row: any) => {
    setSelectedRecords(row);
    onRowSelection(row);
  };

  const resetRowSelection = () => {
    setSelectedRecords([]);
  };

  return (
    <>
      {totalRecords ? (
        <DataTable
          className="table-hover whitespace-nowrap"
          classNames={{
            pagination: "!px-4",
          }}
          records={records}
          columns={columns}
          highlightOnHover
          totalRecords={totalRecords}
          page={page}
          onPageChange={handlePageChange}
          sortStatus={sortStatus}
          onSortStatusChange={handleSortChange}
          minHeight={200}
          paginationText={({ from, to, totalRecords }) =>
            `Showing  ${from} to ${to} of ${totalRecords} entries`
          }
          recordsPerPageOptions={PAGE_SIZES}
          recordsPerPage={pageSize}
          onRecordsPerPageChange={handlePageSizeChange}
          selectedRecords={selectedRecords}
          onSelectedRecordsChange={handleRowSelection}
        />
      ) : (
        <DataTable
          className="table-hover whitespace-nowrap"
          classNames={{
            pagination: "!px-4",
          }}
          records={records}
          columns={columns}
          highlightOnHover
          sortStatus={sortStatus}
          onSortStatusChange={handleSortChange}
          minHeight={200}
        />
      )}
    </>
  );
};
