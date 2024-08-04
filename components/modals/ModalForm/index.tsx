"use client";
import React, { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import IconX from "@/components/icon/icon-x";

type TProps = {
  title: string;
  show: boolean;
  toggle: () => void;
  onCancel: () => void;
  onConfirm: (p?: any) => void;
  children: any;
  isConfirmDisabled: boolean;
  showConfirm?: boolean;
};

export const ModalForm = ({
  title,
  show,
  toggle,
  onCancel,
  onConfirm,
  children,
  isConfirmDisabled = false,
  showConfirm = true
}: TProps) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" open={show} onClose={toggle} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[black]/60" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center px-4 py-8">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                <button
                  type="button"
                  onClick={onCancel}
                  className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 ltr:right-4 rtl:left-4 dark:hover:text-gray-600"
                >
                  <IconX />
                </button>
                <div className="bg-[#fbfbfb] py-3 text-lg font-medium ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5 dark:bg-[#121c2c]">
                  {title}
                </div>
                <div className="p-5">
                  {children}
                  <div className="mt-8 flex items-center justify-end">
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={onCancel}
                    >
                      Cancel
                    </button>
                    {showConfirm ? (
                      <button
                      type="button"
                      className="btn btn-primary ltr:ml-4 rtl:mr-4"
                      disabled={isConfirmDisabled}
                      onClick={onConfirm}
                    >
                      Confirm
                    </button>
                    ) : null}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
