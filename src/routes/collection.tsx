import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProductGrid } from "@/components/ProductGrid";
import { EditorialSection } from "@/components/EditorialSection";
import { FooterSection } from "@/components/FooterSection";

export const Route = createFileRoute("/collection")({
  component: Collection,
});

function Collection() {
  // read search query from URL
  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const q = params.get("search") ?? "";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProductGrid search={q} />
      <EditorialSection />
      <FooterSection />
    </div>
  );
}
