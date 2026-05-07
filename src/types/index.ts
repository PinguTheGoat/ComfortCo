/**
 * Global type definitions for the application
 */

export interface Product {
  slug: string;
  image: string;
  images: string[];
  name: string;
  price: string;
  sku: string;
  material: string;
  description: string;
  details: string[];
  sizes: string[];
  category: string;
}

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  size: string;
  image: string;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export type PaginationParams = {
  page: number;
  limit: number;
};

export type SortOrder = "asc" | "desc";
