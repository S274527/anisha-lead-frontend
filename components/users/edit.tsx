"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Input,
  InputSelect,
  ErrorMessage,
  Label,
  Textarea,
} from "@/components/common";
import { editUserSchema } from "@/validations";
import { showMessage } from "@/utils";
import {
  GET_USER_KEY,
  fetchUser,
  editUserRequest,
  fetchPermissions,
  FETCH_PERMISSIONS_KEY,
} from "@/client/endpoints";
import { DefaultValue, BooleanValues } from "@/types";
import { LINKS } from "@/constants";
import "react-phone-number-input/style.css";
import PhoneInput, {
  isValidPhoneNumber,
  getCountryCallingCode,
} from "react-phone-number-input";
import { phoneStyles } from "@/constants";
import { useSession } from "@/hooks";

const booleanOptions = Object.values(BooleanValues).map((value) => ({
  id: value,
  name: value,
}));

const defaultCountryCode = "US";

export const EditForm = () => {
  const { id } = useParams();
  const router = useRouter();
  const [permissionOptions, setPermissionOptions] = useState<DefaultValue[] | null>(null);
  const [countryCode, setCountryCode] = useState("1");
  const [permissionId, setPermissionId] = useState(0);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const { userType } = useSession();

  useEffect(() => {
    if(userType === 'user'){
      router.push('/dashboard');
    }
  }, [userType])

  const { data: user } = useQuery(
    [GET_USER_KEY, id],
    () => fetchUser(id as string),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: 0,
      enabled: id ? true : false,
    }
  );

  const { data: permissions } = useQuery(
    [FETCH_PERMISSIONS_KEY],
    () =>
      fetchPermissions({
        size: 1000,
        skip: 0,
        search: "",
        sorting: 'id DESC'
      }),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: 0,
      refetchOnMount: false,
    }
  );

  useEffect(() => {
    if (permissions && permissions?.data?.length) {
      let permissionValues: DefaultValue[] = [];
      setPermissionId(permissions?.data[0]?.id?.toString());
      permissions?.data?.map((permission: any) => {
        permissionValues.push({
          id: permission.id?.toString(),
          name: permission.title,
        });
      });
      setPermissionOptions(permissionValues);
    }
  }, [permissions]);

  useEffect(() => {
    if (user && user?.id) {
      reset({
        email: user?.email ?? "",
        full_name: user?.full_name ?? "",
        contact_number: user?.contact_number
          ? `${user?.phone_code}${user?.contact_number}`
          : "",
        address: user?.address ?? "",
        active: user?.active == 1 ? BooleanValues.YES : BooleanValues.NO,
      });
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(editUserSchema),
    defaultValues: {},
  });

  const { mutate: editUser } = useMutation(editUserRequest, {
    onSuccess: (res) => {
      router.push(LINKS.users.route);
      showMessage(res.data.message);
    },
  });

  const onSubmit = (data: any) => {
    const phoneCode = `+${countryCode}`;
    const phoneNumber = data.contact_number.replace(phoneCode, "");
    let payload = {
      ...data,
      contact_number: phoneNumber,
      phone_code: phoneCode,
      active: data.active === BooleanValues.YES ? "1" : "0",
      permission_id: permissionId,
      view: selectedPermissions?.includes('View') ? 1 : 0,
      add: selectedPermissions?.includes('Add') ? 1 : 0,
      edit: selectedPermissions?.includes('Edit') ? 1 : 0,
      delete: selectedPermissions?.includes('Delete') ? 1 : 0
    };
    editUser({
      id: user?.id,
      ...payload,
    });
  };

  useEffect(() => {
    if (user && user?.user_permissions && user?.user_permissions?.length) {
      const perms = user?.user_permissions[0];
      setPermissionId(perms[0]?.id);
      let existingPermissions = [];
      if (perms?.add) {
        existingPermissions.push('Add');
      }
      if (perms?.edit) {
        existingPermissions.push('Edit');
      }
      if (perms?.view) {
        existingPermissions.push('View');
      }
      if (perms?.delete) {
        existingPermissions.push('Delete');
      }
      setSelectedPermissions(existingPermissions);
    }
  }, [user])

  const handlePermission = (name: string, id: string, isChecked: boolean) => {
    let existingPermissions = [...selectedPermissions];
    if (isChecked) {
      existingPermissions.push(name);
    } else {
      const index = existingPermissions.indexOf(name);
      if (index > -1) {
        existingPermissions.splice(index, 1);
      }
    }
    setSelectedPermissions(existingPermissions);
  }

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
                  label="Full Name"
                  {...register("full_name")}
                  type="text"
                  errorText={errors.full_name?.message}
                  placeholder="Enter Full Name"
                />
              </div>
              <div>
                <Label label="Phone number">
                  <small className="text-danger">*</small>
                </Label>
                <Controller
                  name="contact_number"
                  control={control}
                  rules={{
                    validate: (value) => isValidPhoneNumber(value),
                  }}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <PhoneInput
                        value={value as any}
                        onChange={onChange}
                        onCountryChange={(e) => {
                          // @ts-ignore
                          const code = getCountryCallingCode(
                            e ?? defaultCountryCode
                          );
                          setCountryCode(code);
                        }}
                        defaultCountry={defaultCountryCode}
                        id="phone-input"
                        style={phoneStyles}
                      />
                    );
                  }}
                />
                <ErrorMessage
                  errorText={errors.contact_number?.message ?? ""}
                />
              </div>
              <div>
                <Input
                  isMandatory
                  inverted
                  label="Email"
                  {...register("email")}
                  type="text"
                  errorText={errors.email?.message}
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <Textarea
                  isMandatory
                  label="Address"
                  {...register("address")}
                  errorText={errors.address?.message}
                  placeholder="Enter Address"
                />
              </div>
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
              {permissionOptions && permissionOptions?.length ? (
                <div>
                  <>
                    <Label label="Permissions" />
                    <hr />
                    {permissionOptions?.map((item) => {
                      return (
                        <ul className="mt-3">
                          <li>
                            <label htmlFor=""><Label label={item?.name} /></label>
                          </li>
                          <li>
                            <label htmlFor=""><input type="checkbox" value={'Add'} onChange={(e) => handlePermission('Add', item?.id, e.target.checked)} defaultChecked={selectedPermissions?.includes('Add')} /> Add</label>
                          </li>
                          <li>
                            <label htmlFor=""><input type="checkbox" value={'Edit'} onChange={(e) => handlePermission('Edit', item?.id, e.target.checked)} defaultChecked={selectedPermissions?.includes('Edit')} /> Edit</label>
                          </li>
                          <li>
                            <label htmlFor=""><input type="checkbox" value={'View'} onChange={(e) => handlePermission('View', item?.id, e.target.checked)} defaultChecked={selectedPermissions?.includes('View')} /> View</label>
                          </li>
                          <li>
                            <label htmlFor=""><input type="checkbox" value={'Delete'} onChange={(e) => handlePermission('Delete', item?.id, e.target.checked)} defaultChecked={selectedPermissions?.includes('Delete')} /> Delete</label>
                          </li>
                        </ul>
                      )
                    })}
                  </>
                </div>
              ) : null}
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
