import type { Metadata } from "next";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { PatternCatalog } from "@/components/sections/PatternCatalog";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MaterialImage } from "@/components/ui/MaterialImage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpecTable } from "@/components/ui/SpecTable";

export const metadata: Metadata = {
  title: "Camouflage Hook and Loop Fabric Products",
  description:
    "Roll and sheet camouflage hook and loop fabric materials for tactical gear, patch production, uniforms, bags, helmet covers, and outdoor equipment."
};

const backing = [
  {
    name: "Plain backing",
    text: "For sewing, cutting, roll conversion, and standard textile processing.",
    image: "/images/patterns/woodland.png"
  },
  {
    name: "Adhesive backing",
    text: "For quick bonding, patch backing, sample making, and converting work.",
    image: "/images/products/adhesive-backed-camo-loop-fabric.png"
  },
  {
    name: "Laminated backing",
    text: "For structure support with fabric, foam, non-woven, or other layers.",
    image: "/images/products/laminated-camo-hook-loop-fabric.png"
  }
];

const specs = [
  { label: "Material", value: "Camouflage felt hook and loop fabric" },
  { label: "Pattern", value: "Woodland / Desert / Digital / Snow / Jungle / Custom" },
  { label: "Width", value: "Customizable" },
  { label: "Thickness", value: "Depends on requirement" },
  { label: "Backing", value: "Plain / Adhesive / Laminated / Custom" },
  { label: "Supply Form", value: "Roll / Sheet / Cut-to-size" },
  { label: "Application", value: "Tactical gear, patches, uniforms, helmet covers, bags" },
  { label: "MOQ", value: "Contact us for details" }
];

export default function ProductsPage() {
  return (
    <>
      <section className="dark-texture text-white">
        <Container className="grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:py-24">
          <div>
            <p className="mono mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#cfe99f]">
              Product center
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-6xl">
              Camouflage Hook and Loop Fabric Products
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
              Roll and sheet materials for tactical gear, patch production, uniforms, bags, helmet
              covers, and outdoor equipment.
            </p>
            <div className="mt-8">
              <Button href="/contact">Request Product Quote</Button>
            </div>
          </div>
          <MaterialImage
            src="/images/products/camo-loop-fabric-roll.png"
            alt="Camouflage hook and loop fabric product roll"
            className="aspect-[16/10] border border-white/15"
            priority
          />
        </Container>
      </section>

      <section className="page-section bg-[var(--surface)]">
        <Container>
          <SectionHeader
            eyebrow="Categories"
            title="Choose by supply form, backing, or customization need."
            description="The product center is structured for B2B buyers who compare material categories before sending specifications."
          />
          <div className="mt-10">
            <ProductGrid />
          </div>
        </Container>
      </section>

      <section className="page-section surface-grid">
        <Container>
          <SectionHeader
            eyebrow="Specification table"
            title="Common parameters for first discussion."
            description="Unconfirmed parameters are intentionally shown as customizable or requirement-based instead of invented technical numbers."
          />
          <div className="mt-8">
            <SpecTable rows={specs} />
          </div>
        </Container>
      </section>

      <section className="page-section bg-[var(--surface)]">
        <Container>
          <SectionHeader
            eyebrow="Backing structure"
            title="Plain, adhesive, and laminated material routes."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {backing.map((item) => (
              <div key={item.name} className="border border-[var(--border)] bg-[var(--background)]">
                <MaterialImage src={item.image} alt={item.name} className="aspect-[4/3]" />
                <div className="p-5">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="page-section surface-grid">
        <Container>
          <SectionHeader
            eyebrow="Pattern samples"
            title="Start with common camouflage directions or send your own artwork."
          />
          <div className="mt-10">
            <PatternCatalog />
          </div>
        </Container>
      </section>

      <section className="page-section bg-[var(--surface)]">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Inquiry"
            title="Send product details and quantity for material quotation."
            description="Include pattern, backing type, width, thickness, roll length, and application if available."
          />
          <InquiryForm sourcePage="Products" title="Product Inquiry" />
        </Container>
      </section>
    </>
  );
}
