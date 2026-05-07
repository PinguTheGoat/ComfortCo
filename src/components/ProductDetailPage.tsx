import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

export function ProductDetailPage({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize) return;
    const numericPrice = parseInt(product.price.replace(/[^0-9]/g, ""), 10);
    const sizeDeltas: Record<string, number> = {
      XS: -10,
      S: -5,
      M: 0,
      L: 5,
      XL: 10,
      "One Size": 0,
    };
    const delta = sizeDeltas[selectedSize] ?? 0;
    const finalPrice = Math.round(numericPrice * (1 + delta / 100));

    addItem({
      slug: product.slug,
      name: product.name,
      price: finalPrice,
      size: selectedSize,
      image: product.image,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-24 px-6 md:px-12">
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      {/* Product Layout */}
      <section className="px-6 md:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative overflow-hidden aspect-[3/4] bg-secondary">
              <img
                src={product.images[activeImage]}
                alt={`${product.name} — view ${activeImage + 1}`}
                className="w-full h-full object-cover transition-opacity duration-500"
                width={800}
                height={1000}
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative overflow-hidden w-20 h-24 bg-secondary transition-all duration-300 ${
                      activeImage === i ? "ring-1 ring-foreground" : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width={80}
                      height={96}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
              {product.category} · {product.sku}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">{product.name}</h1>
            <p className="font-mono text-sm tracking-wide text-muted-foreground mb-8">
              {/* Show dynamic price: range when no size selected, specific price when selected */}
              {(() => {
                const numericPrice = parseInt(product.price.replace(/[^0-9]/g, ""), 10);
                const sizeDeltas: Record<string, number> = {
                  XS: -10,
                  S: -5,
                  M: 0,
                  L: 5,
                  XL: 10,
                  "One Size": 0,
                };

                if (selectedSize) {
                  const delta = sizeDeltas[selectedSize] ?? 0;
                  const p = Math.round(numericPrice * (1 + delta / 100));
                  return `€${p}`;
                }

                // show min-max range
                const prices = product.sizes.map((s) => {
                  const delta = sizeDeltas[s] ?? 0;
                  return Math.round(numericPrice * (1 + delta / 100));
                });
                const min = Math.min(...prices);
                const max = Math.max(...prices);
                return min === max ? `€${min}` : `€${min} — €${max}`;
              })()}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground mb-10 max-w-md">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-8">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                Size
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-10 min-w-[44px] px-4 font-mono text-[11px] tracking-[0.1em] uppercase border transition-all duration-300 ${
                      selectedSize === size
                        ? "bg-foreground text-background border-foreground"
                        : "bg-transparent text-foreground border-border hover:border-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Material */}
            <div className="mb-10">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                Material
              </p>
              <p className="font-mono text-[11px] tracking-[0.1em] text-foreground">
                {product.material}
              </p>
            </div>

            {/* Add to Cart */}
            <Button
              variant="pill"
              size="pill"
              className="w-full md:w-auto md:self-start"
              disabled={!selectedSize}
              onClick={handleAddToCart}
            >
              {selectedSize ? "Add to Cart" : "Select a Size"}
            </Button>

            {/* Details */}
            <div className="mt-16 pt-8 border-t border-border">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
                Details
              </p>
              <ul className="space-y-2">
                {product.details.map((detail, i) => (
                  <li
                    key={i}
                    className="font-mono text-[11px] tracking-[0.05em] text-muted-foreground"
                  >
                    — {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
