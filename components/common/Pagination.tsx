"use client";
import React, { useMemo } from "react";
import ReactPaginate from "react-paginate";

type TProps = {
  pageCount: number;
  handlePageClick: (p: any) => void;
};

export const Pagination = ({ pageCount, handlePageClick }: TProps) => {
  return (
    <ReactPaginate
      breakLabel="..."
      previousLabel="<"
      nextLabel=">"
      pageRangeDisplayed={1}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
      onPageChange={handlePageClick}
      containerClassName="flex items-center justify-end mt-4"
      pageClassName="mx-1"
      breakClassName="mx-1"
      pageLinkClassName="bg-[#00000014] h-8 w-8 flex justify-center items-center rounded-[50%]"
      previousLinkClassName="mx-1 bg-[#00000014] h-8 w-8 flex justify-center items-center rounded-[50%]"
      nextLinkClassName="bg-[#00000014] h-8 w-8 flex justify-center items-center rounded-[50%] ms-1"
      activeLinkClassName="bg-[#4361ee] text-[#fff]"
      selectedPageRel={null}
      nextPageRel={null}
      initialPage={0}
    />
  );
};
