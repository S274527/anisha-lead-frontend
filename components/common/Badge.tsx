'use client';
import React from 'react';

type TProps = {
  type:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark';
  message: React.ReactNode;
};

const getClassName = (text: string) => {
  let cls = '';
  if (text === 'primary') {
    cls = 'bg-primary';
  } else if (text === 'success') {
    cls = 'bg-success';
  } else if (text === 'danger') {
    cls = 'bg-danger';
  } else if (text === 'warning') {
    cls = 'bg-warning';
  } else if (text === 'info') {
    cls = 'bg-info';
  } else if (text === 'dark') {
    cls = 'bg-dark';
  } else if (text === 'secondary') {
    cls = 'bg-secondary';
  } else {
    cls = 'bg-primary';
  }
  return cls;
};

export const Badge = ({ type, message }: TProps) => {
  return (
    <span className={`badge ${getClassName(type)} capitalize`}>{message}</span>
  );
};

export function StatusBadge({ status }: { status?: string }) {
  if (status === 'active') {
    return <Badge type="success" message="Active" />;
  } else if (status === 'pending') {
    return <Badge type="warning" message="Pending" />;
  } else if (status === 'inactive') {
    return <Badge type="danger" message="Inactive" />;
  } else {
    return <Badge type="info" message={status} />;
  }
}
