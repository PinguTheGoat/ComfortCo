export function FooterSection() {
  return (
    <footer className="px-6 md:px-12 py-16 border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <p className="font-serif text-xl text-foreground mb-4">ComfortCo.</p>
          <p className="font-mono text-[10px] leading-relaxed text-muted-foreground max-w-xs">
            Organic essentials for considered living. Designed in Stockholm, made with care.
          </p>
        </div>
        <div className="md:col-span-2 md:col-start-7">
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Shop
          </p>
          <div className="space-y-2">
            <p className="font-mono text-[11px] text-foreground cursor-pointer hover:text-muted-foreground transition-colors">
              All Products
            </p>
            <p className="font-mono text-[11px] text-foreground cursor-pointer hover:text-muted-foreground transition-colors">
              New Arrivals
            </p>
            <p className="font-mono text-[11px] text-foreground cursor-pointer hover:text-muted-foreground transition-colors">
              Bestsellers
            </p>
          </div>
        </div>
        <div className="md:col-span-2">
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Info
          </p>
          <div className="space-y-2">
            <p className="font-mono text-[11px] text-foreground cursor-pointer hover:text-muted-foreground transition-colors">
              About
            </p>
            <p className="font-mono text-[11px] text-foreground cursor-pointer hover:text-muted-foreground transition-colors">
              Sustainability
            </p>
            <p className="font-mono text-[11px] text-foreground cursor-pointer hover:text-muted-foreground transition-colors">
              Contact
            </p>
          </div>
        </div>
        <div className="md:col-span-2">
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Follow
          </p>
          <div className="space-y-2">
            <p className="font-mono text-[11px] text-foreground cursor-pointer hover:text-muted-foreground transition-colors">
              Instagram
            </p>
            <p className="font-mono text-[11px] text-foreground cursor-pointer hover:text-muted-foreground transition-colors">
              Pinterest
            </p>
          </div>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground">
          © 2026 ComfortCo. All rights reserved.
        </p>
        <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground">
          Stockholm, Sweden
        </p>
      </div>
    </footer>
  );
}
