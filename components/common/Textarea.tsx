import clsx from "clsx";
import React, { TextareaHTMLAttributes, forwardRef } from "react";
import { ErrorMessage } from "@/components/common";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  errorText?: string;
  label?: string;
  isMandatory?: boolean;
};

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, errorText, isMandatory, ...props }, ref) => {
    return (
      <label>
        {label && (
          <label>
            {label} {isMandatory && <small className="text-danger">*</small>}
          </label>
        )}
        <textarea
          {...props}
          ref={ref}
          className={clsx("form-textarea", errorText && "border-[#DB4A46]")}
        />
        {errorText && <ErrorMessage errorText={errorText} />}
      </label>
    );
  }
);
