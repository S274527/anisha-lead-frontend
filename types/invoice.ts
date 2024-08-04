export type TInvoice = {
    id: number;
    user_id: number;
    subscription_id: number;
    plan_id: number;
    amount: string;
    status: "paid" | "unpaid";
    createdAt: Date;
    updatedAt: Date;
};