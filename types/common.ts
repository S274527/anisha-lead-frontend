export type DefaultValue = {
  id: string;
  name: string;
};

export type TQueryData = {
  size: number;
  skip: number;
  search: string;
  sorting?: string;
  trashOnly?: string;
};

export enum BooleanValues {
  YES = "Yes",
  NO = "No",
}

export type TDashboardQueryData = {
  range: string;
  type: string;
};

export type TDashboardFilter = {
  id: string;
  name: string;
};
