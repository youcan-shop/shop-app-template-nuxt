export interface Currency {
  code: string;
  symbol: string;
}

export interface Store {
  id: string;
  slug: string;
  name: string;
  is_staff: boolean;
  email: string;
  due_amount: number;
  balance: number;
  unpaid_invoices_amount: number;
  store_id: string;
  currency: Currency;
  domain: string;
  status: string;
  status_text: string;
  closed_at: number | null;
  pack_id: string;
  logo: string;
  first_name: string;
  last_name: string;
  full_name: string;
  phone: string | null;
  bio: string | null;
  website: string | null;
  notices: string[];
  is_active: boolean;
  is_email_verified: boolean;
  can_request: boolean;
  can_cancel: boolean;
  is_dev?: boolean;
}
