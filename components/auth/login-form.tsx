"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import IconLockDots from "@/components/icon/icon-lock-dots";
import IconMail from "@/components/icon/icon-mail";
import { loginSchema } from "@/validations";
import { ErrorMessage } from "@/components/error-message";
import { TLogin } from "@/client/endpoints";
import { useLogin } from "@/hooks";
import IconEye from "@/components/icon/icon-eye";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    resolver: yupResolver(loginSchema),
  });
  const [fieldType, setFieldType] = useState("password");

  const { mutate } = useLogin();

  const onSubmit = (data: TLogin) => {
    mutate(data);
  };

  return (
    <form
      className="space-y-5 dark:text-white"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label htmlFor="Email">Email</label>
        <div className="relative text-white-dark">
          <input
            id="Email"
            type="email"
            placeholder="Enter Email"
            className="form-input ps-10 placeholder:text-white-dark"
            {...register("email")}
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <IconMail fill={true} />
          </span>
        </div>
        {errors.email?.message && (
          <ErrorMessage message={errors.email?.message} />
        )}
      </div>
      <div>
        <label htmlFor="Password">Password</label>
        <div className="relative text-white-dark">
          <input
            id="Password"
            type={fieldType}
            placeholder="Enter Password"
            className="form-input ps-10 placeholder:text-white-dark"
            {...register("password")}
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <IconLockDots fill={true} />
          </span>
          <span
            className="absolute right-3 top-2 cursor-pointer"
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
                  borderLeft: "solid 2px",
                  top: 0,
                  transform: "rotate(45deg)",
                  left: "9px",
                }}
              ></span>
            )}
          </span>
        </div>
        {errors.password?.message && (
          <ErrorMessage message={errors.password?.message} />
        )}
      </div>
      <button
        type="submit"
        className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
      >
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
