import { Button } from "@/components/ui/button";
import heroTexture from "@/assets/hero-texture.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-end pb-20 md:pb-32 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroTexture}
          alt="Organic cotton texture close-up showing natural fabric weave"
          className="w-full h-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20" />
      </div>

      <div className="relative z-10 px-6 md:px-12 w-full">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
            SS26 — Organic Essentials
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground leading-[0.9] mb-8">
            Worn,
            <br />
            not worn out.
          </h1>
          <Button variant="pill" size="pill">
            Shop Collection
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 right-6 md:right-12 z-10">
        <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground">
          100% Organic Cotton
        </p>
      </div>
    </section>
  );
}
