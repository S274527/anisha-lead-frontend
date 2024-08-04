import * as yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";
import { asyncDebounce } from "@/utils";

const verifyPhone = async (value: string, values: yup.TestContext<any>) => {
  try {
    return await isValidPhoneNumber(value);
  } catch (e) {
    return false;
  }
};

const debounceVerifyPhone = asyncDebounce(verifyPhone, 500);
const debounceVerifyPhone1 = asyncDebounce(verifyPhone, 500);
const debounceVerifyPhone2 = asyncDebounce(verifyPhone, 500);

export const addClientSchema = yup
  .object({
    company_name: yup.string().required("Company Name is required"),
    company_url: yup.string().matches(
      /^(?!:\/\/)([a-z0-9-_]+\.)*[a-z0-9][a-z0-9-_]+\.[a-z]{2,11}?$/,
      "This field cannot contain any special character and uppercase letter"
    ).required("Company URL is required"),
    company_sub_domain: yup.string().matches(
      /^(?!:\/\/)([a-z0-9-_]+\.)*[a-z0-9][a-z0-9-_]+\.[a-z]{2,11}?$/,
      "This field cannot contain any special character and uppercase letter"
    ).required("Company Sub Domain is required"),
    address: yup.string().required("Address is required"),
    phone_number: yup
      .string()
      .required("Contact number is required")
      .test(
        "phone_number_verified",
        "Please enter a valid phone",
        async (value, values) => {
          const verified = await debounceVerifyPhone(value as string, values);
          return verified as boolean;
        }
      ),
    contact_name: yup.string().required("Contact Name is required"),
    contact_email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Contact Email is required"),
    contact_phone_number: yup
      .string()
      .required("Contact number is required")
      .test(
        "contact_phone_number_verified",
        "Please enter a valid phone",
        async (value, values) => {
          const verified = await debounceVerifyPhone1(value as string, values);
          return verified as boolean;
        }
      ),
    secondary_contact_name: yup
      .string()
      .required("Secondary Contact Name is required"),
    secondary_contact_email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Secondary Contact Email is required"),
    secondary_contact_phone_number: yup
      .string()
      .required("Contact number is required")
      .test(
        "secondary_contact_phone_number_verified",
        "Please enter a valid phone",
        async (value, values) => {
          const verified = await debounceVerifyPhone2(value as string, values);
          return verified as boolean;
        }
      ),
    contract_start_date: yup.date().required("Start Date is required"),
    contract_end_date: yup.date().required("End Date is required"),
    invoice_date: yup.date().required("Invoice Date is required"),
    invoice_amount: yup.string().required("Invoice Amount is required"),
    referred_by: yup.string().required("Referred By is required"),
    special_notes: yup.string().optional(),
    active: yup.string().required("Active is required"),
  })
  .required();
