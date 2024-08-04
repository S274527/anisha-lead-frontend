import { DataTableSortStatus } from "mantine-datatable";
import { TQueryData } from "@/types";

export const phoneStyles = {
  backgroundColor: "#fff",
  display: "flex",
  borderRadius: 8,
  borderColor: "rgb(218 218 218)",
  borderStyle: "solid",
  borderWidth: 1,
  paddingLeft: 15,
  paddingTop: 11,
  paddingBottom: 11,
  outline: "none",
  boxShadow: "none",
};

export const DATEFILTERS = {
  LastMonth: 'Last Month',
  ThisMonth: 'This Month',
  LastWeek: 'Last Week',
  ThisWeek: 'This Week'
}

export const METRIC_TYPES = {
  CLIENTS: 'clients',
  INCOME: 'income',
  USERS: 'users',
  INCOME_SERIES: 'income_series'
}

export const DEFAULT_SORT = "id DESC";

export const DEFAULT_QUERY: TQueryData = {
  size: 10,
  skip: 0,
  search: "",
  sorting: DEFAULT_SORT,
  trashOnly: ''
};

export const DEFAULT_SORTING: DataTableSortStatus = {
  columnAccessor: "id",
  direction: "asc",
}
