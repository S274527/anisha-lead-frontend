import { List } from '@/components/faq';
import { Metadata } from 'next';
import React from 'react';
import { LocationBoard } from '../permissions/LocationBoard';

export const metadata: Metadata = {
  title: 'Faqs',
};

const Faqs = () => {
  return (
    <>
      <LocationBoard />
      <List />
    </>
  );
};

export default Faqs;
