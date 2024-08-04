import { List } from '@/components/users';
import { Metadata } from 'next';
import React from 'react';
import { LocationBoard } from '../permissions/LocationBoard';

export const metadata: Metadata = {
  title: 'Users',
};

const Users = () => {
  return (
    <>
      <LocationBoard />
      <List />
    </>
  );
};

export default Users;
