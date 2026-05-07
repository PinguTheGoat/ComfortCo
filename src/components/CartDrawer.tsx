import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalPrice } =
    useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-background border-l border-border shadow-2xl transition-transform duration-500 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="font-serif text-xl text-foreground">Cart ({totalItems})</h2>
          <button
            onClick={closeCart}
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Close
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="font-serif text-lg text-foreground mb-2">Your cart is empty</p>
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                Add something beautiful
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={`${item.slug}-${item.size}`} className="flex gap-4">
                  <div className="w-20 h-24 bg-secondary flex-shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      width={80}
                      height={96}
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-sm text-foreground">{item.name}</h3>
                    <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground mt-0.5">
                      Size: {item.size}
                    </p>
                    <p className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground mt-1">
                      €{item.price}
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => updateQuantity(item.slug, item.size, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center border border-border font-mono text-xs text-foreground hover:bg-secondary transition-colors"
                      >
                        −
                      </button>
                      <span className="font-mono text-[11px] tracking-[0.1em] text-foreground w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.slug, item.size, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center border border-border font-mono text-xs text-foreground hover:bg-secondary transition-colors"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.slug, item.size)}
                        className="ml-auto font-mono text-[9px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-6 border-t border-border">
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                Total
              </span>
              <span className="font-mono text-sm tracking-wide text-foreground">€{totalPrice}</span>
            </div>
            <Link to="/checkout" onClick={closeCart} className="block">
              <Button variant="pill" size="pill" className="w-full">
                Checkout
              </Button>
            </Link>
            <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted-foreground text-center mt-3">
              Shipping calculated at checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
}
