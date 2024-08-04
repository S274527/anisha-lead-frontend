import * as yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";
import { asyncDebounce } from "@/utils";

const verifyPhone = async (value: string, values: yup.TestContext<any>) => {
  try {
    const data = await isValidPhoneNumber(value);
    return data;
  } catch (e) {
    return true;
  }
};

const debounceVerifyPhone = asyncDebounce(verifyPhone, 300);

export const addUserSchema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    full_name: yup.string().required("Full name is required"),
    address: yup.string().required("Address is required"),
    active: yup.string().required("Active is required"),
    contact_number: yup
      .string()
      .required("Contact number is required")
      .test("verified", "Please enter a valid phone", async (value, values) => {
        const verified = await debounceVerifyPhone(value as string, values);
        return verified as boolean;
      }),
    password: yup.string().required("Password is required"),
  })
  .required();

export const editUserSchema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    full_name: yup.string().required("Full name is required"),
    address: yup.string().required("Address is required"),
    active: yup.string().required("Active is required"),
    contact_number: yup
      .string()
      .required("Contact number is required")
      .test("verified", "Please enter a valid phone", async (value, values) => {
        const verified = await debounceVerifyPhone(value as string, values);
        return verified as boolean;
      }),
  })
  .required();

export const editAdminProfileSchema = yup
  .object({
    full_name: yup.string().required("Full name is required"),
    address: yup.string().required("Address is required"),
    contact_number: yup
      .string()
      .required("Contact number is required")
      .test({
        name: "validatePhoneNumber",
        message: "Please enter a valid phone number",
        test: async (value, values) => {
          const verified = await debounceVerifyPhone(value as string, values);
          return verified as boolean;
        },
        exclusive: true,
      }),
  })
  .required();




  export const addLeadSchema = yup
  .object({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    address: yup.string().required("Address is required"),
    status: yup.string().required("Status is required"),
    source: yup.string().required("Source is required"),
    description: yup.string().required("Description is required"),
    contact_number: yup
      .string()
      .required("Contact number is required")
      .test("verified", "Please enter a valid phone", async (value, values) => {
        const verified = await debounceVerifyPhone(value as string, values);
        return verified as boolean;
      }),
    user_id: yup.string().optional(),
    // follow_up_date: yup.string().optional(),
  })
  .required();

  export const addFaqSchema = yup
  .object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
  })
  .required();
