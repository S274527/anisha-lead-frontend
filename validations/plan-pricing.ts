import * as yup from 'yup';

export const planSchema = yup.object().shape({
  name: yup.string().required('Plan name is required'),
  amount: yup.string().required('Amount is required'),
  sms_per_day: yup.string().required('SMS limit per day is required'),
  email_per_day: yup.string().required('Email limit per day is required'),
  charts_allowed: yup.string().required('Track charts upto is required'),
  status: yup.string().required('Status is required'),
  paypal_trial_id: yup.string().optional(),
  paypal_regular_id: yup.string().optional(),
});
