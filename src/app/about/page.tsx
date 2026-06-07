import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { MaterialImage } from "@/components/ui/MaterialImage";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "About TacticalTex Materials",
  description:
    "A factory focused on camouflage hook and loop fabric materials for tactical gear, patches, uniforms, helmet covers, bags, and outdoor equipment."
};

const products = [
  "Roll material",
  "Sheet material",
  "Adhesive backed material",
  "Laminated material",
  "Custom camouflage material"
];

const cooperation = ["Send inquiry", "Confirm material details", "Sample", "Bulk production", "Shipment"];

export default function AboutPage() {
  return (
    <>
      <section className="bg-[var(--surface)]">
        <Container className="grid gap-10 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-24">
          <div>
            <p className="mono mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--olive)]">
              About us
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-6xl">
              A factory focused on camouflage hook and loop fabric materials.
            </h1>
            <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
              We manufacture camouflage hook and loop fabric materials for tactical gear, military
              patches, uniforms, helmet covers, bags, and outdoor equipment.
            </p>
            <div className="mt-8">
              <Button href="/contact">Contact Sales</Button>
            </div>
          </div>
          <MaterialImage
            src="/images/factory/production-workshop.png"
            alt="Factory and material production"
            className="aspect-[4/3] border border-[var(--border)]"
            priority
          />
        </Container>
      </section>

      <section className="page-section surface-grid">
        <Container className="grid gap-10 lg:grid-cols-2">
          <SectionHeader
            eyebrow="What we produce"
            title="Material supply, not retail tactical gear."
            description="Our pages may show application references so buyers can evaluate use cases, but the commercial focus is camouflage hook and loop fabric material."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {products.map((item) => (
              <div key={item} className="border border-[var(--border)] bg-[var(--surface)] p-5 font-semibold">
                {item}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="page-section bg-[var(--surface)]">
        <Container>
          <SectionHeader eyebrow="How we cooperate" title="A practical route for overseas B2B buyers." />
          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {cooperation.map((step, index) => (
              <div key={step} className="border border-[var(--border)] bg-[var(--background)] p-5">
                <span className="mono text-2xl font-semibold text-[var(--olive)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 font-semibold">{step}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
