import { useState } from "react";
import { Link } from "@tanstack/react-router";

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  sku: string;
  material: string;
  slug: string;
}

export function ProductCard({ image, name, price, sku, material, slug }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to="/product/$slug"
      params={{ slug }}
      className="group relative cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden aspect-[3/4] bg-secondary">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          width={800}
          height={1000}
        />
        <div
          className={`absolute inset-0 bg-foreground/5 transition-opacity duration-500 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="font-serif text-lg text-foreground">{name}</h3>
          <div
            className={`overflow-hidden transition-all duration-500 ease-out ${
              hovered ? "max-h-20 opacity-100 mt-1" : "max-h-0 opacity-0"
            }`}
          >
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
              {material}
            </p>
            <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted-foreground mt-0.5">
              SKU: {sku}
            </p>
          </div>
        </div>
        <span className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground">
          {price}
        </span>
      </div>
    </Link>
  );
}
