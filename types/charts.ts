export type TChart = {
  id: number;
  name: string;
  icon: string;
  active: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TChartCategory = {
  id: number;
  name: string;
  active: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TChartCategoryPayload = {
  id?: number;
  name: string;
  active: string | number;
};
