import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface PaymentInfo {
  cardNumber: string;
  expiry: string;
  cvc: string;
  nameOnCard: string;
}

function CheckoutPage() {
  const { items, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<"shipping" | "payment" | "confirmation">("shipping");
  const [shipping, setShipping] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [payment, setPayment] = useState<PaymentInfo>({
    cardNumber: "",
    expiry: "",
    cvc: "",
    nameOnCard: "",
  });
  const [orderNumber] = useState(() => `CC-${Date.now().toString(36).toUpperCase()}`);

  if (items.length === 0 && step !== "confirmation") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-serif text-2xl text-foreground mb-3">Your cart is empty</h1>
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-8">
            Add items before checking out
          </p>
          <Link to="/">
            <Button variant="pill" size="pill">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const shippingCost = totalPrice >= 100 ? 0 : 8;
  const orderTotal = totalPrice + shippingCost;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("confirmation");
    window.scrollTo(0, 0);
  };

  const inputClass =
    "w-full bg-transparent border-b border-border py-3 font-mono text-[12px] tracking-[0.05em] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors";

  if (step === "confirmation") {
    return (
      <div className="min-h-screen bg-background px-6 py-24 md:py-32">
        <div className="max-w-lg mx-auto text-center">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Order Confirmed
          </p>
          <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-3">
            Thank you, {shipping.firstName}.
          </h1>
          <p className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground mb-8">
            Order {orderNumber} · €{orderTotal}
          </p>
          <div className="border border-border p-6 text-left mb-8">
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-3">
              Shipping to
            </p>
            <p className="font-mono text-[12px] text-foreground leading-relaxed">
              {shipping.firstName} {shipping.lastName}
              <br />
              {shipping.address}
              <br />
              {shipping.postalCode} {shipping.city}
              <br />
              {shipping.country}
            </p>
          </div>
          <Link to="/">
            <Button variant="pill" size="pill">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            to="/"
            className="font-serif text-xl text-foreground hover:opacity-70 transition-opacity"
          >
            ComfortCo.
          </Link>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            Checkout
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          {/* Left — Form */}
          <div className="md:col-span-7">
            {/* Progress */}
            <div className="flex items-center gap-4 mb-12">
              <span
                className={`font-mono text-[10px] tracking-[0.2em] uppercase ${step === "shipping" ? "text-foreground" : "text-muted-foreground"}`}
              >
                1. Shipping
              </span>
              <span className="w-8 h-px bg-border" />
              <span
                className={`font-mono text-[10px] tracking-[0.2em] uppercase ${step === "payment" ? "text-foreground" : "text-muted-foreground"}`}
              >
                2. Payment
              </span>
            </div>

            {step === "shipping" && (
              <form onSubmit={handleShippingSubmit}>
                <h2 className="font-serif text-xl text-foreground mb-8">Shipping Details</h2>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                  <div>
                    <input
                      className={inputClass}
                      placeholder="First name"
                      required
                      value={shipping.firstName}
                      onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <input
                      className={inputClass}
                      placeholder="Last name"
                      required
                      value={shipping.lastName}
                      onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })}
                    />
                  </div>
                </div>
                <input
                  className={`${inputClass} mt-1`}
                  type="email"
                  placeholder="Email address"
                  required
                  value={shipping.email}
                  onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                />
                <input
                  className={`${inputClass} mt-1`}
                  placeholder="Street address"
                  required
                  value={shipping.address}
                  onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-x-6 gap-y-1 mt-1">
                  <input
                    className={inputClass}
                    placeholder="City"
                    required
                    value={shipping.city}
                    onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                  />
                  <input
                    className={inputClass}
                    placeholder="Postal code"
                    required
                    value={shipping.postalCode}
                    onChange={(e) => setShipping({ ...shipping, postalCode: e.target.value })}
                  />
                </div>
                <input
                  className={`${inputClass} mt-1`}
                  placeholder="Country"
                  required
                  value={shipping.country}
                  onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
                />
                <div className="mt-10">
                  <Button type="submit" variant="pill" size="pill" className="w-full md:w-auto">
                    Continue to Payment
                  </Button>
                </div>
              </form>
            )}

            {step === "payment" && (
              <form onSubmit={handlePaymentSubmit}>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-serif text-xl text-foreground">Payment</h2>
                  <button
                    type="button"
                    onClick={() => setStep("shipping")}
                    className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ← Edit shipping
                  </button>
                </div>
                <input
                  className={inputClass}
                  placeholder="Name on card"
                  required
                  value={payment.nameOnCard}
                  onChange={(e) => setPayment({ ...payment, nameOnCard: e.target.value })}
                />
                <input
                  className={`${inputClass} mt-1`}
                  placeholder="Card number"
                  required
                  maxLength={19}
                  value={payment.cardNumber}
                  onChange={(e) => {
                    const v = e.target.value
                      .replace(/\D/g, "")
                      .replace(/(.{4})/g, "$1 ")
                      .trim();
                    setPayment({ ...payment, cardNumber: v });
                  }}
                />
                <div className="grid grid-cols-2 gap-x-6 gap-y-1 mt-1">
                  <input
                    className={inputClass}
                    placeholder="MM / YY"
                    required
                    maxLength={7}
                    value={payment.expiry}
                    onChange={(e) => {
                      let v = e.target.value.replace(/\D/g, "");
                      if (v.length >= 2) v = v.slice(0, 2) + " / " + v.slice(2, 4);
                      setPayment({ ...payment, expiry: v });
                    }}
                  />
                  <input
                    className={inputClass}
                    placeholder="CVC"
                    required
                    maxLength={4}
                    value={payment.cvc}
                    onChange={(e) =>
                      setPayment({ ...payment, cvc: e.target.value.replace(/\D/g, "") })
                    }
                  />
                </div>
                <div className="mt-10">
                  <Button type="submit" variant="pill" size="pill" className="w-full md:w-auto">
                    Place Order — €{orderTotal}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Right — Order Summary */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-24">
              <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-6">
                Order Summary ({totalItems})
              </h2>
              <div className="space-y-5">
                {items.map((item) => (
                  <div key={`${item.slug}-${item.size}`} className="flex gap-4">
                    <div className="w-16 h-20 bg-secondary flex-shrink-0 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        width={64}
                        height={80}
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-sm text-foreground">{item.name}</h3>
                      <p className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground mt-0.5">
                        Size {item.size} · Qty {item.quantity}
                      </p>
                    </div>
                    <p className="font-mono text-[11px] text-foreground">
                      €{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-border mt-6 pt-6 space-y-3">
                <div className="flex justify-between">
                  <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                    Subtotal
                  </span>
                  <span className="font-mono text-[11px] text-foreground">€{totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                    Shipping
                  </span>
                  <span className="font-mono text-[11px] text-foreground">
                    {shippingCost === 0 ? "Free" : `€${shippingCost}`}
                  </span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-foreground">
                    Total
                  </span>
                  <span className="font-mono text-sm text-foreground">€{orderTotal}</span>
                </div>
              </div>
              {totalPrice < 100 && (
                <p className="font-mono text-[9px] tracking-[0.1em] text-muted-foreground mt-4">
                  Free shipping on orders over €100
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
