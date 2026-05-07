import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

interface ProductGridProps {
  search?: string;
}

export function ProductGrid({ search = "" }: ProductGridProps) {
  const q = search.trim().toLowerCase();
  const filtered = q
    ? products.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
      )
    : products;

  return (
    <section className="px-6 md:px-12 py-24 md:py-32">
      <div className="flex items-end justify-between mb-16">
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
            {String(filtered.length).padStart(3, "0")} Items
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">The Collection</h2>
        </div>
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hidden md:block">
          View All →
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {filtered.map((product) => (
          <ProductCard
            key={product.sku}
            slug={product.slug}
            image={product.image}
            name={product.name}
            price={product.price}
            sku={product.sku}
            material={product.material}
          />
        ))}
      </div>
    </section>
  );
}
