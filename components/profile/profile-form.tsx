'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useMutation } from 'react-query';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, ErrorMessage, Label, Textarea } from '@/components/common';
import { useSession, TUserSession } from '@/hooks';
import { TEditAdminProfile, editAdminProfileRequest } from '@/client/endpoints';
import 'react-phone-number-input/style.css';
import PhoneInput, {
  isValidPhoneNumber,
  getCountryCallingCode,
} from 'react-phone-number-input';
import { phoneStyles } from '@/constants';
import { showMessage } from '@/utils';
import { editAdminProfileSchema } from '@/validations';
import { ChangePassword } from './components';

const defaultCountryCode = 'US';

export const ProfileForm = () => {
  const { session, updateUserSession } = useSession();
  const [countryCode, setCountryCode] = useState('1');
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TEditAdminProfile>({
    mode: 'onBlur',
    // @ts-ignore
    resolver: yupResolver(editAdminProfileSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (session && session?.user?.id) {
      reset({
        full_name: session?.user?.full_name ?? '',
        contact_number: session?.user?.contact_number
          ? `${session?.user?.phone_code}${session?.user?.contact_number}`
          : '',
        address: session?.user?.address ?? '',
      });
    }
  }, [session]);

  const { mutate: editAdmin } = useMutation(editAdminProfileRequest, {
    onSuccess: res => {
      showMessage(res.data.message);
    },
  });

  const onSubmit = (data: TEditAdminProfile) => {
    const phoneCode = `+${countryCode}`;
    const phoneNumber = data.contact_number.replace(phoneCode, '');
    let payload = {
      ...data,
      contact_number: phoneNumber,
      phone_code: phoneCode,
    };
    editAdmin(payload);
    let prevSession = { ...session };
    let newDetails = {
      ...prevSession?.user,
      full_name: payload.full_name,
      address: payload.address,
      contact_number: payload.contact_number,
      phone_code: payload.phone_code,
    };
    prevSession = {
      ...prevSession,
      // @ts-ignore
      user: newDetails,
    };
    updateUserSession(prevSession as TUserSession);
  };

  const showChangePasswordModal = () => setShow(true);

  return (
    <div className="pt-5">
      <div className="mb-5 flex items-center justify-between">
        <h5 className="text-lg font-semibold dark:text-white-light">
          Account Settings
        </h5>
      </div>
      <div>
        <form className="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-black">
          <h6 className="mb-5 text-lg font-bold">Profile</h6>
          <div className="flex flex-col sm:flex-row">
            <div className="mb-5 w-full sm:w-1/12 ltr:sm:mr-4 rtl:sm:ml-4">
              <Image
                src="/assets/images/default-user.jpg"
                alt="img"
                className="mb-5 rounded-full object-cover"
                width={140}
                height={140}
              />
            </div>
            <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <Input
                  inverted
                  label="Email"
                  type="text"
                  value={session?.user?.email ?? ''}
                  readOnly
                  disabled
                />
              </div>
              <div>
                <Input
                  inverted
                  label="Full Name"
                  {...register('full_name')}
                  type="text"
                  errorText={errors.full_name?.message}
                />
              </div>
              <div>
                <Label label="Phone number" />
                <Controller
                  name="contact_number"
                  control={control}
                  rules={{
                    validate: value => isValidPhoneNumber(value),
                  }}
                  render={({ field: { onChange, value, onBlur, ref } }) => {
                    return (
                      <PhoneInput
                        value={value as any}
                        onChange={onChange}
                        onBlur={onBlur}
                        onCountryChange={e => {
                          // @ts-ignore
                          const code = getCountryCallingCode(
                            e ?? defaultCountryCode,
                          );
                          setCountryCode(code);
                        }}
                        defaultCountry={defaultCountryCode}
                        id="phone-input"
                        style={phoneStyles}
                        ref={ref}
                      />
                    );
                  }}
                />
                <ErrorMessage
                  errorText={errors.contact_number?.message ?? ''}
                />
              </div>
              <div>
                <Textarea
                  label="Address"
                  {...register('address')}
                  errorText={errors.address?.message}
                />
              </div>
              <div>
                <Input
                  inverted
                  label="Password"
                  type="text"
                  disabled
                  defaultValue="********"
                  inputClassName="!pt-4"
                  readOnly
                />
                <div className="mt-2">
                  <span
                    className="cursor-pointer font-semibold text-primary"
                    onClick={showChangePasswordModal}>
                    Change Password
                  </span>
                </div>
              </div>
              <div className="mt-3 sm:col-span-2">
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit(onSubmit)}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <ChangePassword show={show} setShow={setShow} />
    </div>
  );
};
