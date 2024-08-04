import * as yup from 'yup';

export const addCategoriesSchema = yup.object({
  id: yup.number().optional(),
  name: yup.string().required('Name is required'),
  status: yup.string().required('Status is required'),
  icon: yup.string().optional(),
});
