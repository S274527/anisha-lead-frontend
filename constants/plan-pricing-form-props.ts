export interface PlanPricingFormProps {
  name: string;
  amount: string;
  sms_per_day: string;
  email_per_day: string;
  charts_allowed: string;
  status: string;
  paypal_trial_id?: string;
  paypal_regular_id?: string;
}

export interface PlanProps extends PlanPricingFormProps {
  id: string;
}
