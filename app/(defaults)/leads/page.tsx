import { List } from '@/components/leads';
import { Metadata } from 'next';
import React from 'react';
import { LocationBoard } from '../permissions/LocationBoard';

export const metadata: Metadata = {
  title: 'Leads',
};

const Leads = () => {
  return (
    <>
      <LocationBoard />
      <List />
    </>
  );
};

export default Leads;
