export type TAddEditVat = {
  percentage: string;
  country: string;
};

export type TVat = {
  id: number;
  percentage: string;
  counrty: string;
  createdAt: Date;
  updatedAt: Date;
};
