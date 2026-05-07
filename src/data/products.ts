import productTee from "@/assets/product-tee.jpg";
import productHoodie from "@/assets/product-hoodie.jpg";
import productPants from "@/assets/product-pants.jpg";
import productTote from "@/assets/product-tote.jpg";
import productTeeDetail from "@/assets/product-tee-detail.jpg";
import productHoodieDetail from "@/assets/product-hoodie-detail.jpg";
import productPantsDetail from "@/assets/product-pants-detail.jpg";
import productToteDetail from "@/assets/product-tote-detail.jpg";
import type { Product } from "@/types";

export const products: Product[] = [
  {
    slug: "essential-tee",
    image: productTee,
    images: [productTee, productTeeDetail],
    name: "The Essential Tee",
    price: "€68",
    sku: "CC-01",
    material: "100% Organic Cotton · 180gsm",
    description:
      "Our foundational piece. Cut from 180gsm organic cotton jersey with a relaxed, boxy silhouette. Pre-washed for softness. No logos, no labels — just considered comfort.",
    details: [
      "100% GOTS-certified organic cotton",
      "180gsm mid-weight jersey",
      "Relaxed boxy fit",
      "Reinforced collar ribbing",
      "Pre-washed for zero shrinkage",
      "Made in Portugal",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "Tops",
  },
  {
    slug: "moss-hoodie",
    image: productHoodie,
    images: [productHoodie, productHoodieDetail],
    name: "Moss Hoodie",
    price: "€128",
    sku: "CC-02",
    material: "100% Organic Cotton · 380gsm",
    description:
      "Heavyweight warmth without compromise. 380gsm brushed-back fleece in our signature Deep Moss. Kangaroo pocket, flatlock seams, and a generous hood that actually stays up.",
    details: [
      "100% GOTS-certified organic cotton",
      "380gsm heavyweight brushed fleece",
      "Oversized relaxed fit",
      "Flatlock seam construction",
      "Kangaroo pocket with internal phone slot",
      "Made in Portugal",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "Tops",
  },
  {
    slug: "relaxed-pant",
    image: productPants,
    images: [productPants, productPantsDetail],
    name: "Relaxed Pant",
    price: "€98",
    sku: "CC-03",
    material: "100% Organic Cotton · 320gsm",
    description:
      "Structured ease. 320gsm organic cotton twill with a wide, relaxed leg and elasticated drawstring waist. Two side pockets and one rear patch pocket.",
    details: [
      "100% GOTS-certified organic cotton twill",
      "320gsm mid-heavy weight",
      "Wide relaxed leg",
      "Elasticated waist with drawstring",
      "Two side pockets, one rear patch pocket",
      "Made in Portugal",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "Bottoms",
  },
  {
    slug: "canvas-tote",
    image: productTote,
    images: [productTote, productToteDetail],
    name: "Canvas Tote",
    price: "€42",
    sku: "CC-04",
    material: "100% Organic Canvas · 12oz",
    description:
      "Built to carry. 12oz organic canvas with reinforced handles and a flat base for structure. Internal slip pocket for essentials. Unbleached, undyed — beautifully raw.",
    details: [
      "100% GOTS-certified organic canvas",
      "12oz heavyweight canvas",
      "Reinforced double-stitched handles",
      "Internal slip pocket",
      "Flat reinforced base",
      "Made in Portugal",
    ],
    sizes: ["One Size"],
    category: "Accessories",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
