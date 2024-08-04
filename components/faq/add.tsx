"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Input,
  Textarea,
} from "@/components/common";
import { addFaqSchema } from "@/validations";
import { showMessage } from "@/utils";
import {
  addFaqRequest
} from "@/client/endpoints";
import { LINKS } from "@/constants";
import "react-phone-number-input/style.css";
import { useSession } from "@/hooks";

export const AddForm = () => {
  const router = useRouter();
  const { userType } = useSession();

  useEffect(() => {
    if (userType === 'user') {
      router.push('/dashboard');
    }
  }, [userType])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(addFaqSchema),
    defaultValues: {},
  });

  const { mutate: addFaq } = useMutation(addFaqRequest, {
    onSuccess: (res) => {
      router.push(LINKS.faq.route);
      showMessage(res.data.message);
    },
  });

  const onSubmit = (data: any) => {
    let payload = {
      ...data
    };
    addFaq({
      ...payload,
    });
  };

  return (
    <div className="pt-5">
      <div>
        <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-6 dark:border-[#191e3a] dark:bg-black">
          <h6 className="mb-5 text-lg font-bold">Add New</h6>
          <div className="flex flex-col sm:flex-row">
            <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <Input
                  isMandatory
                  inverted
                  label="Title"
                  {...register("title")}
                  type="text"
                  errorText={errors.title?.message}
                  placeholder="Enter title"
                />
              </div>
              <div>
                <Textarea
                  isMandatory
                  label="Description"
                  {...register("description")}
                  errorText={errors.description?.message}
                  placeholder="Enter description"
                />
              </div>
              <div className="mt-3 sm:col-span-2">
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit(onSubmit)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
