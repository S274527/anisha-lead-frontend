"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Input,
  InputSelect,
  ErrorMessage,
  Label,
  Textarea,
} from "@/components/common";
import { addLeadSchema } from "@/validations";
import { showMessage } from "@/utils";
import {
  addLeadRequest,
  fetchUsers,
  FETCH_USERS_KEY,
} from "@/client/endpoints";
import { DefaultValue } from "@/types";
import { LINKS } from "@/constants";
import "react-phone-number-input/style.css";
import PhoneInput, {
  isValidPhoneNumber,
  getCountryCallingCode,
} from "react-phone-number-input";
import { phoneStyles } from "@/constants";
import { useSession } from "@/hooks";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const defaultCountryCode = "US";

const statuses = [{ id: 'Closed', name: 'Closed' }, { id: 'Callback', name: 'Callback' }, { id: 'Hold', name: 'Hold' }, { id: 'Enrolled', name: 'Enrolled' }, { id: 'Failed', name: 'Failed' }, { id: 'Follow up', name: 'Follow up' }, { id: 'Closed', name: 'Closed' }];
const sources = [{ id: 'Facebook', name: 'Facebook' }, { id: 'Instagram', name: 'Instagram' }, { id: 'Phone call', name: 'Phone call' }, { id: 'Personal meet', name: 'Personal meet' }];

export const AddForm = () => {
  const router = useRouter();
  const [countryCode, setCountryCode] = useState("1");
  const [userOptions, setUserOptions] = useState<any>([]);
  const { session } = useSession();
  const [startDate, setStartDate] = useState(new Date());

  const { data: users } = useQuery(
    [FETCH_USERS_KEY],
    () =>
      fetchUsers({
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
    if (users && users?.data?.length) {
      let tempList: any = [];
      users?.data?.map((item: any) => {
        tempList.push({
          id: item?.id,
          name: item?.full_name
        })
      })
      setUserOptions(tempList);
    }
  }, [users])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(addLeadSchema),
    defaultValues: {},
  });

  const { mutate: addLead } = useMutation(addLeadRequest, {
    onSuccess: (res) => {
      router.push(LINKS.leads.route);
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
      user_id: session?.user?.type === 'user' ? session?.user?.id : data?.user_id
    };
    addLead({
      ...payload,
      follow_up_date: dayjs(startDate).format('DD-MM-YYYY')
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
                  label="First Name"
                  {...register("first_name")}
                  type="text"
                  errorText={errors.first_name?.message}
                  placeholder="Enter First Name"
                />
              </div>
              <div>
                <Input
                  isMandatory
                  inverted
                  label="Last Name"
                  {...register("last_name")}
                  type="text"
                  errorText={errors.last_name?.message}
                  placeholder="Enter Last Name"
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
                <Textarea
                  isMandatory
                  label="Address"
                  {...register("address")}
                  errorText={errors.address?.message}
                  placeholder="Enter Address"
                />
              </div>
              <div>
                <Textarea
                  isMandatory
                  label="Description"
                  {...register("description")}
                  errorText={errors.description?.message}
                  placeholder="Enter Description"
                />
              </div>
              <div>
                <Controller
                  control={control}
                  name="status"
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
                      options={statuses}
                      getOptionValue={(option) =>
                        (option as DefaultValue).id.toString()
                      }
                      getOptionLabel={(option) => (option as DefaultValue).name}
                      value={statuses.find(
                        (item) => item.id === value?.toString()
                      )}
                      label="Status"
                      errorText={errors.status?.message}
                      onBlur={onBlur}
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  control={control}
                  name="source"
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
                      options={sources}
                      getOptionValue={(option) =>
                        (option as DefaultValue).id.toString()
                      }
                      getOptionLabel={(option) => (option as DefaultValue).name}
                      value={sources.find(
                        (item) => item.id === value?.toString()
                      )}
                      label="Source"
                      errorText={errors.status?.message}
                      onBlur={onBlur}
                    />
                  )}
                />
              </div>
              <div style={{ display: session?.user?.type === 'admin' ? 'block' : 'none' }}>
                <Controller
                  control={control}
                  name="user_id"
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
                      options={userOptions}
                      getOptionValue={(option) =>
                        (option as DefaultValue).id.toString()
                      }
                      getOptionLabel={(option) => (option as DefaultValue).name}
                      value={userOptions.find(
                        (item: any) => item.id === value?.toString()
                      )}
                      label="User"
                      errorText={errors.user_id?.message}
                      onBlur={onBlur}
                    />
                  )}
                />
              </div>
              <div>
                <Label label={'Follow up date'}>
                  <small className="text-danger">*</small>
                </Label>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date as any)} className="date-picker-lead" />
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
