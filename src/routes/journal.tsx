import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/journal")({
  component: Journal,
});

function Journal() {
  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-4xl font-bold text-foreground mb-4">Journal</h1>
      <p className="text-foreground">Stay tuned for updates, stories, and behind‑the‑scenes looks at ComfortCo.</p>
    </div>
  );
}
