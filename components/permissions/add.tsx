"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, InputSelect } from "@/components/common";
import { addRoleSchema } from "@/validations";
import { showMessage } from "@/utils";
import {
  addRoleRequest,
  GET_ROLE_KEY,
  fetchRole,
  TAddRole,
  editRoleRequest,
} from "@/client/endpoints";
import { DefaultValue, BooleanValues } from "@/types";
import { LINKS } from "@/constants";

const booleanOptions = Object.values(BooleanValues).map((value) => ({
  id: value,
  name: value,
}));

export type TAddRoleFields = {
  name: string;
  active: string;
};

export const AddForm = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data: role } = useQuery(
    [GET_ROLE_KEY, id],
    () => fetchRole(id as string),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: 0,
      enabled: id ? true : false,
    }
  );

  useEffect(() => {
    if (role && role?.id) {
      reset({
        name: role?.name ?? "",
        active: role?.active == 1 ? BooleanValues.YES : BooleanValues.NO,
      });
    }
  }, [role]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TAddRoleFields>({
    resolver: yupResolver(addRoleSchema),
    defaultValues: {},
  });

  const { mutate: addNewRole } = useMutation(addRoleRequest, {
    onSuccess: (res) => {
      router.push(LINKS.adminPermissions.route);
      showMessage(res.data.message);
    },
  });

  const { mutate: editRole } = useMutation(editRoleRequest, {
    onSuccess: (res) => {
      router.push(LINKS.adminPermissions.route);
      showMessage(res.data.message);
    },
  });

  const onSubmit = (data: TAddRole) => {
    if (role && role?.id) {
      editRole({
        id: role?.id,
        ...data,
        active: data.active === BooleanValues.YES ? 1 : 0,
      });
    } else {
      addNewRole({
        ...data,
        active: data.active === BooleanValues.YES ? 1 : 0,
      });
    }
  };

  return (
    <div className="pt-5">
      <div>
        <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-6 dark:border-[#191e3a] dark:bg-black">
          <h6 className="mb-5 text-lg font-bold">
            {role && role?.id ? "Edit" : "Add New"}
          </h6>
          <div className="flex flex-col sm:flex-row">
            <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <Input
                  inverted
                  label="Name"
                  {...register("name")}
                  type="text"
                  errorText={errors.name?.message}
                  placeholder="Enter Name"
                  isMandatory
                />
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-col sm:flex-row">
            <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <Controller
                  control={control}
                  name="active"
                  shouldUnregister={false}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value, onBlur },
                    fieldState: { error },
                  }) => (
                    <InputSelect
                      isMandatory
                      onChange={(option) =>
                        onChange((option as DefaultValue).id)
                      }
                      options={booleanOptions}
                      getOptionValue={(option) =>
                        (option as DefaultValue).id.toString()
                      }
                      getOptionLabel={(option) => (option as DefaultValue).name}
                      value={booleanOptions.find(
                        (item) => item.id === value?.toString()
                      )}
                      label="Active"
                      errorText={errors.active?.message}
                      onBlur={onBlur}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="mt-3 mt-5 sm:col-span-2">
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
  );
};
