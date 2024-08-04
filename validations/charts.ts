import * as yup from 'yup';

export const addChartSchema = yup
  .object({
    name: yup.string().required('Name is required'),
    active: yup.string().required('Active is required'),
    icon: yup.string().optional(),
    price: yup.string().required('Price is required'),
  })
  .required();

export const addChartCategorySchema = yup
  .object({
    name: yup.string().required('Name is required'),
    active: yup.string().required('Active is required'),
  })
  .required();
