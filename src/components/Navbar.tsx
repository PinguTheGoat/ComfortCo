import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/contexts/CartContext";
import { Search } from "lucide-react";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { totalItems, openCart } = useCart();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-background/80 backdrop-blur-sm">
        <Link to="/" className="font-serif text-xl tracking-wide text-foreground">
          ComfortCo.
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Collection
          </Link>
          <Link
            to="/about"
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            to="/journal"
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Journal
          </Link>

          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const q = encodeURIComponent(searchTerm.trim());
                  if (q.length) window.location.href = `/collection?search=${q}`;
                }
              }}
              placeholder="Search"
              className="ml-2 pl-8 pr-3 h-9 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground"
            />
          </div>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="font-mono text-[10px] tracking-[0.2em] uppercase text-foreground md:hidden"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
        <button
          onClick={openCart}
          className="hidden md:block font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
        >
          Cart ({totalItems})
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-8 md:hidden">
          <span className="font-serif text-3xl text-foreground cursor-pointer">Collection</span>
          <span className="font-serif text-3xl text-foreground cursor-pointer">About</span>
          <span className="font-serif text-3xl text-foreground cursor-pointer">Journal</span>
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Collection
            </Link>
            <Link
              to="/about"
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              to="/journal"
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Journal
            </Link>
          </div>
          <button
            onClick={() => {
              openCart();
              setMenuOpen(false);
            }}
            className="font-serif text-3xl text-foreground cursor-pointer"
          >
            Cart ({totalItems})
          </button>
        </div>
      )}
    </>
  );
}
