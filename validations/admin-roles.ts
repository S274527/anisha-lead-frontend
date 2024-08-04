import * as yup from "yup";

export const addRoleSchema = yup
  .object({
    name: yup.string().required("Name is required"),
    active: yup.string().required("Active is required"),
  })
  .required();
