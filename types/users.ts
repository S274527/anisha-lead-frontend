export type TClientUser = {
    full_name: string,
    email: string,
    phone_number: string,
    phone_code?: string,
    address: string,
    active: string,
    client_id?: number | string,
    role_id?: number,
    id?: number;
    last_login_at?: string,
    last_login_ip?: string,
    createdAt?: Date | undefined,
    updatedAt?: Date | undefined,
}

export type TUser = {
    id?: string;
    email: string;
    password?: string;
    full_name: string;
    contact_number: string;
    phone_code: string;
    country_code?: string;
    status: string;
    profile_photo?: string;
    address: string;
  };
  
  export type TAddUser = {
    email: string;
    full_name?: string;
    contact_number?: string;
    phone_code?: string;
    country_code?: string;
    address?: string;
    status: string;
    profile_photo?: string;
    profile_photo_data?: string;
  };
  
  export type TEditUser = {
    id?: string;
    email: string;
    full_name?: string;
    contact_number?: string;
    phone_code?: string;
    country_code?: string;
    address?: string;
    status: string;
    profile_photo?: string;
  };
  