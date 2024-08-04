import clsx from "clsx";
import { InputHTMLAttributes, forwardRef, useState } from "react";
import { ErrorMessage } from "@/components/common";
import IconEye from "@/components/icon/icon-eye";

export type TPasswordInputProps = InputHTMLAttributes<HTMLInputElement> & {
  errorText?: string;
  label?: string;
  inverted?: boolean;
  labelClassName?: string;
  inputContainerClassName?: string;
  inputClassName?: string;
  labelClass?: string;
  disabled?: boolean;
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

export const PasswordInput = forwardRef<HTMLInputElement, TPasswordInputProps>(
  (
    {
      labelClassName,
      inputContainerClassName,
      inputClassName,
      label,
      labelClass,
      errorText = "",
      inverted = false,
      disabled = false,
      isMandatory = false,
      ...props
    },
    ref
  ) => {
    const [fieldType, setFieldType] = useState("password");
    const inputThemeType = inverted ? "inverted" : "default";

    return (
      <div className="relative">
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
          <input
            {...props}
            ref={ref}
            type={fieldType}
            className={clsx(
              "form-input w-full bg-transparent p-3 leading-[16.94px] outline-none focus:ring-0",
              disabled ? "!bg-[#f5f5f5]" : "",
              inputClassName
            )}
          />
          <span
            className="absolute right-3 top-[42px] cursor-pointer"
            onClick={() => {
              setFieldType(fieldType === "text" ? "password" : "text");
            }}
          >
            <IconEye />
            {fieldType === "text" && (
              <span
                style={{
                  position: "absolute",
                  height: "20px",
                  borderLeft: "solid 2px #b5b5b5",
                  top: 0,
                  transform: "rotate(45deg)",
                  left: "9px",
                }}
              ></span>
            )}
          </span>
        </div>
        {errorText && <ErrorMessage errorText={errorText} />}
      </div>
    );
  }
);
