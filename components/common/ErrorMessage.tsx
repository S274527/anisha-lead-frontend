"use client";
import React from "react";

type TProps = {
  errorText?: string;
};

export const ErrorMessage = ({ errorText }: TProps) => {
  if (!errorText) return <></>;
  return (
    <p className="mt-[6px] flex items-start text-[12px] font-semibold leading-[12.1px] text-[#DB4A46]">
      {errorText}
    </p>
  );
};
