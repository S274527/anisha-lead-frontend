import * as yup from "yup";

export const addTaxSchema = yup
  .object({
    percentage: yup.string().required("Value is required"),
    country: yup.string().required("Country is required"),
  })
  .required();