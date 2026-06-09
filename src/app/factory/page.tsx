import type { Metadata } from "next";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Container } from "@/components/ui/Container";
import { MaterialImage } from "@/components/ui/MaterialImage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { factoryProcess, factoryStats, qualityChecks } from "@/content/factory";

export const metadata: Metadata = {
  title: "Factory Capability",
  description:
    "Factory capability for camouflage hook and loop fabric roll production, backing, lamination, cutting, quality inspection, packing, and shipment."
};

export default function FactoryPage() {
  return (
    <>
      <section className="bg-[var(--surface)]">
        <Container className="grid gap-10 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-24">
          <div>
            <p className="mono mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--olive)]">
              Factory capability
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-6xl">
              Manufacturing route for camouflage hook and loop fabric materials.
            </h1>
            <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
              We manufacture camouflage hook and loop fabric materials for OEM and bulk supply
              customers. Our factory supports roll production, custom backing, lamination, cutting,
              and packaging.
            </p>
          </div>
          <MaterialImage
            src="/images/factory/warehouse-shipment.png"
            alt="Camouflage hook and loop fabric factory workshop"
            className="aspect-[4/3] border border-[var(--border)]"
            priority
          />
        </Container>
      </section>

      <section className="page-section dark-texture text-white">
        <Container>
          <SectionHeader
            eyebrow="Factory data"
            title="Capacity indicators for buyer evaluation."
            description="These values are placeholders and should be replaced with confirmed factory data before production launch."
            light
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {factoryStats.map((stat) => (
              <div key={stat.label} className="border border-white/15 bg-white/7 p-5">
                <p className="mono text-3xl font-semibold tracking-[-0.03em]">{stat.value}</p>
                <p className="mt-3 font-semibold">{stat.label}</p>
                <p className="mt-2 text-xs leading-5 text-white/55">{stat.note}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="page-section bg-[var(--surface)]">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Production flow" title="From raw material to inspected shipment." />
            <div className="mt-8 grid gap-3">
              {factoryProcess.map((step, index) => (
                <div key={step} className="flex gap-4 border border-[var(--border)] bg-[var(--background)] p-4">
                  <span className="mono text-sm font-bold text-[var(--olive)]">{String(index + 1).padStart(2, "0")}</span>
                  <p className="font-semibold">{step}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <MaterialImage
              src="/images/factory/all-materials-wall.jpg"
              alt="Materials"
              className="mb-6 aspect-[4/3] border border-[var(--border)]"
            />
            <div className="grid gap-3">
              {qualityChecks.map((check) => (
                <div key={check} className="flex gap-3">
                  <CheckCircle size={20} className="text-[var(--olive)]" />
                  <p className="font-semibold">{check}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="page-section surface-grid">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Factory inquiry"
            title="Ask about production capacity, backing, lamination, and sample schedule."
          />
          <InquiryForm sourcePage="Factory" title="Factory Capability Inquiry" />
        </Container>
      </section>
    </>
  );
}
