import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProductGrid } from "@/components/ProductGrid";
import { EditorialSection } from "@/components/EditorialSection";
import { FooterSection } from "@/components/FooterSection";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "ComfortCo. — Organic Essentials" },
      {
        name: "description",
        content:
          "Premium organic cotton essentials designed for considered living. No logos. No seasons. Just comfort.",
      },
      { property: "og:title", content: "ComfortCo. — Organic Essentials" },
      {
        property: "og:description",
        content: "Premium organic cotton essentials designed for considered living.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProductGrid />
      <EditorialSection />
      <FooterSection />
    </div>
  );
}
