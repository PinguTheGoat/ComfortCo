import { Button } from "@/components/ui/button";

export function EditorialSection() {
  return (
    <section className="px-6 md:px-12 py-24 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
        <div className="md:col-span-5 md:col-start-2">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-6">
            Our Philosophy
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground leading-[1.1] mb-6">
            Less, but
            <br />
            better.
          </h2>
          <p className="font-mono text-[11px] leading-relaxed text-muted-foreground max-w-sm mb-8">
            Every piece is designed to last. We use only certified organic cotton, dyed with
            low-impact processes, and cut in small batches to eliminate waste. No logos. No seasons.
            Just essentials.
          </p>
          <Button variant="mossPill" size="pill">
            Learn More
          </Button>
        </div>
        <div className="md:col-span-4 md:col-start-8">
          <div className="space-y-8">
            <div>
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-1">
                01
              </p>
              <p className="font-serif text-lg text-foreground">Organic Cotton</p>
              <p className="font-mono text-[10px] text-muted-foreground mt-1">
                GOTS certified, rain-fed fields
              </p>
            </div>
            <div className="w-full h-px bg-border" />
            <div>
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-1">
                02
              </p>
              <p className="font-serif text-lg text-foreground">Low-Impact Dye</p>
              <p className="font-mono text-[10px] text-muted-foreground mt-1">
                Plant-based, zero heavy metals
              </p>
            </div>
            <div className="w-full h-px bg-border" />
            <div>
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-1">
                03
              </p>
              <p className="font-serif text-lg text-foreground">Small Batch</p>
              <p className="font-mono text-[10px] text-muted-foreground mt-1">
                200 units per run, zero overstock
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
