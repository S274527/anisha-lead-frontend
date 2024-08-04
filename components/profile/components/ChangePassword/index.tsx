'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PasswordChecklist from 'react-password-checklist';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { ModalForm } from '@/components/modals';
import { PasswordInput } from '@/components/common';
import { changeAdminPasswordSchema } from '@/validations';
import {
  TChangeAdminPassword,
  changeAdminPasswordRequest,
} from '@/client/endpoints';
import { showMessage } from '@/utils';
import { useSession } from '@/hooks';

type TProps = {
  show: boolean;
  setShow: (p: boolean) => void;
};

export const ChangePassword = ({ show, setShow }: TProps) => {
  const [isValidPassword, setIsValidPassword] = useState(false);
  const { logout, session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<TChangeAdminPassword>({
    resolver: yupResolver(changeAdminPasswordSchema),
  });

  const { mutate } = useMutation(changeAdminPasswordRequest, {
    onSuccess: res => {
      setTimeout(() => {
        showMessage(res.data.message);
      }, 2000);
      logout();
    },
  });

  const toggle = () => {
    setShow(!show);
    reset({});
  };

  const onCancel = () => {
    setShow(false);
    reset({});
  };

  const onSubmit = (data: TChangeAdminPassword) => {
    mutate(data);
  };

  return (
    <ModalForm
      title="Change Password"
      show={show}
      toggle={toggle}
      onCancel={onCancel}
      onConfirm={handleSubmit(onSubmit)}
      isConfirmDisabled={!isValidPassword}>
      <form className="mb-5 bg-white dark:border-[#191e3a] dark:bg-black">
        <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-1">
          <div>
            <PasswordInput
              isMandatory
              inverted
              label="Current Password"
              {...register('old_password')}
              errorText={errors.old_password?.message}
              placeholder="Enter Current Password"
            />
          </div>
          <div>
            <PasswordInput
              isMandatory
              inverted
              label="New Password"
              {...register('new_password')}
              errorText={errors.new_password?.message}
              placeholder="Enter New Password"
            />
            {watch('new_password') && (
              <div className="mt-2">
                <PasswordChecklist
                  rules={['minLength', 'specialChar', 'number', 'capital']}
                  minLength={5}
                  value={watch('new_password')}
                  onChange={e => setIsValidPassword(e)}
                />
              </div>
            )}
          </div>
        </div>
      </form>
    </ModalForm>
  );
};
