export const LINKS = {
  dashboard: {
    route: '/dashboard',
  },
  login: {
    route: '/auth/signin',
  },
  adminPermissions: {
    route: '/permissions',
    add: '/permissions/add',
    edit: (param: string) => `/permissions/edit/${param}`,
  },
  admins: {
    route: '/admins',
    add: '/admins/add',
    edit: (param: string) => `/admins/edit/${param}`,
    trash: '/admins/trash',
  },
  users: {
    route: '/users',
    add: '/users/add',
    edit: (param: string) => `/users/edit/${param}`,
  },
  faq: {
    route: '/faq',
    add: '/faq/add',
    edit: (param: string) => `/faq/edit/${param}`,
  },
  leads: {
    route: '/leads',
    add: '/leads/add',
    edit: (param: string) => `/leads/edit/${param}`,
  },
  clients: {
    route: '/clients',
    add: '/clients/add',
    edit: (param: string) => `/clients/edit/${param}`,
    view: (param: string) => `/clients/view/${param}`,
  },
  clientUsers: {
    route: (param: string) => `/clients/${param}/users`,
    add: (param: string) => `/clients/${param}/users/add`,
    edit: (client_id: string, user_id: string) =>
      `/clients/${client_id}/users/edit/${user_id}`,
    view: (client_id: string, user_id: string) =>
      `/clients/${client_id}/users/view/${user_id}`,
  },
  charts: {
    route: '/charts',
    add: '/charts/add',
    edit: (param: string) => `/charts/edit/${param}`,
    trash: '/charts/trash',
  },
  subscriptions: {
    route: '/subscriptions',
    view: (param: string) => `/subscriptions/view/${param}`,
    trash: '/subscriptions/trash',
    add: '/subscriptions/add',
  },
  invoices: {
    route: '/invoices',
    view: (param: string) => `/invoices/view/${param}`,
    trash: '/invoices/trash',
  },
  chartCategories: {
    route: '/chart-categories',
    add: '/chart-categories/add',
    edit: (param: string) => `/chart-categories/edit/${param}`,
    trash: '/chart-categories/trash',
  },
  taxes: {
    route: '/taxes',
    add: '/taxes/add',
    edit: (param: string) => `/taxes/edit/${param}`,
  },
};
