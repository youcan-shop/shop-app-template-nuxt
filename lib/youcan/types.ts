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

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compare_at_price: number | null;
  cost_price: number | null;
  visibility: boolean;
  track_inventory: boolean;
  has_variants: boolean;
  meta: Record<string, any>;
  variant_options: any[];
  created_at: string;
  images: any[];
}

export type ProductInclude = 'variants' | 'categories' | 'vendors' | 'images';

export interface ProductListOptions {
  include?: ProductInclude[];
  limit?: number;
  page?: number;
  q?: string;
  [key: string]: any;
}

export interface PaginationMeta {
  pagination: {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    links: any[];
  };
}

export interface CollectionResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface StatusObject {
  slug: string;
  name: string;
  color: string;
}

export interface Payment {
  status: number;
  status_text: string;
  status_object: StatusObject;
  gateway?: string;
  gateway_type?: number;
  gateway_type_text?: string;
  created_at: string;
  updated_at: string;
}

export interface Shipping {
  status: number;
  status_text: string;
  status_object: StatusObject;
  price: number;
  is_free: boolean;
  tracking_number: string | null;
  created_at: string;
  updated_at: string;
}

export interface Discount {
  id: string;
  value: number;
  type: number;
  type_text: string;
}

export interface OrderVariant {
  id: string;
  price: number;
  quantity: number;
  is_upsell: boolean;
  created_at: number | string;
  updated_at: number | string;
  extra_fields: Record<string, any> | null;
  variant: any;
}

export interface Order {
  id: string;
  ref: string;
  vat: number;
  total: number;
  currency: string;
  customer_currency: any;
  customer_currency_rate: number | null;
  notes: string | null;
  status: number;
  status_new: string;
  status_object: StatusObject;
  payment_status: number;
  payment_status_new: string;
  confirmation_status: string;
  shipping_status: string;
  tags: string[];
  extra_fields: Record<string, any> | null;
  custom_fields: Record<string, any> | null;
  is_refunded_by_platform: boolean;
  platform_fee: number;
  payment: Payment;
  shipping: Shipping;
  discount: Discount | null;
  variants: OrderVariant[];
  created_at: string;
  updated_at: string;
  links: {
    show: string;
  };
}

export type OrderInclude = 'customer' | 'variants' | 'referenced_order' | 'comments' | 'payment' | 'shipping' | 'discount' | 'coupon' | 'refunds';

export interface OrderListOptions {
  include?: OrderInclude[];
  page?: number;
  limit?: number;
  q?: string;
  [key: string]: any;
}

export interface OrderGetOptions {
  include?: OrderInclude[];
}

export interface ProductGetOptions {
  include?: ProductInclude[];
}
