import * as yup from "yup";

export const changeAdminPasswordSchema = yup
  .object({
    old_password: yup.string().required("Current Password is required"),
    new_password: yup.string().required("New Password is required"),
  })
  .required();
