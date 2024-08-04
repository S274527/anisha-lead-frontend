"use client";
import React from "react";
import IconSearch from "@/components/icon/icon-search";
import IconX from "@/components/icon/icon-x";
import IconPlus from "@/components/icon/icon-plus";
import IconTrashLines from "@/components/icon/icon-trash-lines";
import IconRestore from "@/components/icon/icon-restore";

type TProps = {
  title: string;
  search: string;
  showAdd?: boolean;
  isTrashList?: boolean;
  showTrash?: boolean;
  isHardDelete?: boolean;
  selectedRows?: number[];
  onSearch: (p: string) => void;
  onAddNew?: () => void;
  onShowTrash?: () => void;
  onMoveToTrash?: () => void;
  onRestore?: () => void;
  onDelete?: () => void;
};

export const ListHeader = ({
  title,
  search,
  showAdd = true,
  isTrashList = false,
  showTrash = false,
  selectedRows,
  isHardDelete = false,
  onSearch,
  onAddNew,
  onShowTrash,
  onMoveToTrash,
  onRestore,
  onDelete,
}: TProps) => {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl">{title}</h2>
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
          <div className="flex gap-3">
            {selectedRows?.length && (!isTrashList || isHardDelete) ? (
              <div>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={onMoveToTrash}
                >
                  <IconTrashLines className="ltr:mr-2 rtl:ml-2" />
                  {isHardDelete ? `Delete ` : `Move To Trash `}(
                  {selectedRows?.length})
                </button>
              </div>
            ) : null}
            {selectedRows?.length && isTrashList ? (
              <>
                <div>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={onRestore}
                  >
                    <IconRestore className="ltr:mr-2 rtl:ml-2" />
                    Restore ({selectedRows?.length})
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={onDelete}
                  >
                    <IconTrashLines className="ltr:mr-2 rtl:ml-2" />
                    Delete ({selectedRows?.length})
                  </button>
                </div>
              </>
            ) : null}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="peer form-input py-2 ltr:pr-11 rtl:pl-11"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
            />
            <button
              onClick={() => {
                if (search) {
                  onSearch("");
                }
              }}
              type="button"
              className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]"
            >
              {search === "" ? (
                <IconSearch className="mx-auto" />
              ) : (
                <IconX className="mx-auto" />
              )}
            </button>
          </div>
          <div className="flex gap-3">
            {showAdd && (
              <div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onAddNew}
                >
                  <IconPlus className="ltr:mr-2 rtl:ml-2" />
                  Add New
                </button>
              </div>
            )}
            {showTrash && (
              <div>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={onShowTrash}
                >
                  <IconTrashLines className="ltr:mr-2 rtl:ml-2" />
                  See Trash
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
