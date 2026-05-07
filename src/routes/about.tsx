import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-4xl font-bold text-foreground mb-4">About ComfortCo</h1>
      <p className="text-foreground">
        ComfortCo creates premium organic cotton apparel that focuses on comfort and sustainability. No logos, no seasons – just timeless basics.
      </p>
    </div>
  );
}
