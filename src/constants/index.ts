/**
 * Application-wide constants
 */

// App Info
export const APP_NAME = "ComfortCo";
export const APP_DESCRIPTION = "Premium comfort wear and lifestyle products";
export const APP_VERSION = "1.0.0";

// Routes
export const ROUTES = {
  HOME: "/",
  CHECKOUT: "/checkout",
  PRODUCT: (slug: string) => `/product/${slug}`,
} as const;

// Price
export const CURRENCY = "€";
export const TAX_RATE = 0.19; // 19% VAX
export const SHIPPING_COST = 9.99;
export const FREE_SHIPPING_THRESHOLD = 100;

// Pagination
export const PRODUCTS_PER_PAGE = 12;
export const MAX_PAGE_SIZE = 100;

// Size Options
export const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;

// Product Categories
export const PRODUCT_CATEGORIES = ["apparel", "accessories", "lifestyle"] as const;

// Notification Messages
export const MESSAGES = {
  // Success
  PRODUCT_ADDED: "Product added to cart",
  PRODUCT_REMOVED: "Product removed from cart",
  CHECKOUT_SUCCESS: "Order placed successfully!",

  // Error
  PRODUCT_NOT_FOUND: "Product not found",
  INVALID_SIZE: "Invalid size selected",
  CHECKOUT_FAILED: "Checkout failed. Please try again.",
  NETWORK_ERROR: "Network error. Please check your connection.",

  // Info
  LOADING: "Loading...",
  EMPTY_CART: "Your cart is empty",
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  PRODUCTS: "/api/products",
  ORDERS: "/api/orders",
  CHECKOUT: "/api/checkout",
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  CART: "comfortco_cart",
  USER: "comfortco_user",
  PREFERENCES: "comfortco_preferences",
} as const;

// Cache Duration (in milliseconds)
export const CACHE_DURATION = {
  PRODUCTS: 5 * 60 * 1000, // 5 minutes
  USER: 1 * 60 * 1000, // 1 minute
  ORDERS: 2 * 60 * 1000, // 2 minutes
} as const;
