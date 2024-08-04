export type TAdminRole = {
    id: number;
    name: string;
    active: number;
    createdAt: Date;
    updatedAt: Date;
}

export type TAdmin = {
    id: number;
    email: string;
    password?: string;
    full_name: string;
    contact_number: string;
    phone_code: string;
    role: number;
    profile_photo: string;
    address: string;
    last_login_at: Date;
    last_login_ip: string;
    refresh_token?: string;
    createdAt: Date;
    updatedAt: Date;
};