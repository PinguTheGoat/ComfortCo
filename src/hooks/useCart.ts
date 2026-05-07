import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";

/**
 * Hook to access cart context
 * Throws error if used outside CartProvider
 */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
