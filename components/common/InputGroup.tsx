import clsx from "clsx";
import { InputHTMLAttributes, forwardRef } from "react";
import { ErrorMessage } from "@/components/common";

export type TInputGroupProps = InputHTMLAttributes<HTMLInputElement> & {
  errorText?: string;
  label?: string;
  inverted?: boolean;
  labelClassName?: string;
  inputContainerClassName?: string;
  inputClassName?: string;
  labelClass?: string;
  prefix?: string;
  postfix?: string;
  isMandatory?: boolean;
};

const styles = {
  inverted: {
    inputContainer:
      "hover:border-[#BBBFD1] focus-within:!text-[#151F4E] focus-within:!border-[#2B3E9B]",
  },
  default: {
    inputContainer:
      "focus-within:border-[#F6F7FF] focus-within:text-[#F6F7FF] hover:border-[#838AA9] hover:focus-within:border-[#F6F7FF] focus:border-[#F6F7FF]",
  },
};

export const InputGroup = forwardRef<HTMLInputElement, TInputGroupProps>(
  (
    {
      labelClassName,
      inputContainerClassName,
      inputClassName,
      label,
      labelClass,
      errorText = "",
      type = "text",
      inverted = false,
      prefix,
      postfix,
      isMandatory = false,
      ...props
    },
    ref
  ) => {
    const inputThemeType = inverted ? "inverted" : "default";

    return (
      <>
        {label && (
          <label className={labelClass}>
            {label} {isMandatory && <small className="text-danger">*</small>}
          </label>
        )}
        <div
          className={clsx(
            "flex w-full rounded-lg",
            inverted
              ? "border-transparent text-[#151F4E]"
              : "border-transparent bg-[#363A55]",
            errorText
              ? "border-[#DB4A46]"
              : styles[inputThemeType].inputContainer,
            inputContainerClassName
          )}
        >
          {prefix && (
            <div className="flex items-center justify-center border border-white-light bg-[#eee] px-3 font-semibold ltr:rounded-l-md ltr:border-r-0 rtl:rounded-r-md rtl:border-l-0 dark:border-[#17263c] dark:bg-[#1b2e4b]">
              {prefix}
            </div>
          )}
          <input
            {...props}
            ref={ref}
            type={type}
            className={clsx(
              "form-input w-full bg-transparent p-3 leading-[16.94px] outline-none focus:ring-0",
              prefix ? "rounded-s-none" : "",
              postfix ? "rounded-e-none" : "",
              inputClassName
            )}
          />
          {postfix && (
            <div className="flex items-center justify-center border border-white-light bg-[#eee] px-3 font-semibold ltr:rounded-r-md ltr:border-l-0 rtl:rounded-l-md rtl:border-r-0 dark:border-[#17263c] dark:bg-[#1b2e4b]">
              {postfix}
            </div>
          )}
        </div>
        {errorText && <ErrorMessage errorText={errorText} />}
      </>
    );
  }
);
