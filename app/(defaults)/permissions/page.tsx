import { List } from '@/components/permissions';
import { Metadata } from 'next';
import React from 'react';
import { LocationBoard } from '../permissions/LocationBoard';

export const metadata: Metadata = {
  title: 'User Permissions',
};

const AdminRoles = () => {
  return (
    <>
      <LocationBoard />
      <List />
    </>
  );
};

export default AdminRoles;
