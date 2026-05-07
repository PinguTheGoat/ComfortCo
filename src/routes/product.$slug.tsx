import { createFileRoute } from "@tanstack/react-router";
import { getProductBySlug } from "@/data/products";
import { ProductDetailPage } from "@/components/ProductDetailPage";

export const Route = createFileRoute("/product/$slug")({
  component: ProductDetail,
  head: ({ params }) => {
    const product = getProductBySlug(params.slug);
    const title = product ? `${product.name} — ComfortCo.` : "Product — ComfortCo.";
    const description = product ? product.description : "Premium organic cotton essentials.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
});

function ProductDetail() {
  const { slug } = Route.useParams();
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-mono text-sm text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  return <ProductDetailPage product={product} />;
}
