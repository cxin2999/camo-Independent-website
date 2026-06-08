import type { Metadata } from "next";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { PatternCatalog } from "@/components/sections/PatternCatalog";
import { Container } from "@/components/ui/Container";
import { MaterialImage } from "@/components/ui/MaterialImage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { applications } from "@/content/applications";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Applications for Camouflage Hook and Loop Fabric",
  description:
    "Camouflage hook and loop fabric applications for tactical gear, military uniforms, patches, helmet covers, and hunting equipment."
};

export default function ApplicationsPage() {
  return (
    <>
      <section className="dark-texture text-white">
        <Container className="py-16 lg:py-24">
          <p className="mono mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#cfe99f]">
            Applications
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-6xl">
            Material applications for tactical, uniform, patch, helmet, and outdoor products.
          </h1>
          <div className="mt-8 border border-[#cfe99f]/40 bg-[#cfe99f]/10 p-5 text-sm leading-6 text-white/78">
            We supply camouflage hook and loop fabric material. Finished tactical products shown on
            this page are for application reference only.
          </div>
        </Container>
      </section>

      <section className="page-section bg-[var(--surface)]">
        <Container>
          <div className="grid gap-12">
            {applications.map((application, index) => (
              <div
                key={application.slug}
                className="grid gap-8 border-b border-[var(--border)] pb-12 last:border-b-0 last:pb-0 lg:grid-cols-[0.95fr_1.05fr] lg:items-center"
              >
                <MaterialImage
                  src={application.image}
                  alt={application.name}
                  className={`border border-[var(--border)] ${index % 2 ? "lg:order-2 aspect-[4/3]" : "aspect-[5/4]"}`}
                />
                <div>
                  <p className="mono mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--olive)]">
                    {application.name}
                  </p>
                  <h2 className="text-3xl font-semibold tracking-[-0.02em]">{application.name}</h2>
                  <p className="mt-4 text-base leading-7 text-[var(--muted)]">{application.description}</p>
                  <div className="mt-6 grid gap-3">
                    {application.bullets.map((bullet) => (
                      <div key={bullet} className="flex gap-3">
                        <Check size={20} className="mt-1 shrink-0 text-[var(--olive)]" />
                        <p className="text-sm leading-6">{bullet}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="page-section surface-grid">
        <Container>
          <SectionHeader
            eyebrow="Terrain pattern"
            title="Match material direction to product environment."
            description="Pattern samples are shown as reference swatches. Custom pattern matching is available for OEM material projects."
          />
          <div className="mt-10">
            <PatternCatalog />
          </div>
        </Container>
      </section>

      <section className="page-section surface-grid">
        <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeader
            eyebrow="Application inquiry"
            title="Tell us your product type and material target."
            description={site.disclaimer}
          />
          <InquiryForm sourcePage="Applications" title="Application Material Inquiry" />
        </Container>
      </section>
    </>
  );
}
