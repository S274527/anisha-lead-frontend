import { AddForm } from '@/components/permissions';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import { LINKS } from '@/constants';

export const metadata: Metadata = {
  title: 'Edit Role',
};

const EditRole = () => {
  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link
            href={LINKS.adminPermissions.route}
            className="text-primary hover:underline">
            User Permissions
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Edit</span>
        </li>
      </ul>
      <AddForm />
    </div>
  );
};

export default EditRole;
